import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Usuario } from '../../../clases/usuario';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesJuegosMenuPage } from '../../pages-juegos/pages-juegos-menu/pages-juegos-menu';
import { PagesPedidosAltaPage } from '../../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { MesasProvider } from '../../../providers/mesas/mesas';
import { UsuarioService } from '../../../services/usuario-service';
import { QRService } from '../../../services/QR-service';
import { Mesa } from '../../../clases/mesa';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { PedidoService } from '../../../services/pedidos-service'
import { Pedido } from '../../../clases/Pedido';
import { SoundsService } from '../../../services/sounds-service';
import { getImageURL, SPINNER_IMG, showAlert, round, spin } from '../../../environments/environment';



@IonicPage()
@Component({
  selector: 'pages-cliente-anonimo-menu',
  templateUrl: 'pages-cliente-anonimo-menu.html',
})
export class PagesClienteAnonimoMenuPage {

  usuario: Usuario;
  ocupaMesa: boolean;
  pedido : Pedido;

  @ViewChild(Navbar) navBar: Navbar;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mesasProvider: MesasProvider,
    private usuarioService: UsuarioService,
    private qrService: QRService,
    private objFirebase: AngularFirestore,
    public toastCtrl: ToastController,
    private pedidoService: PedidoService,
    private soundsService: SoundsService,
    private alertController: AlertController

    ) {
      this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
      
      this.mesasProvider.listaMesasObservable.subscribe(arr => {
            
       arr.forEach((mesa: Mesa) => {
        if(mesa.usuario !== undefined && mesa.usuario !== null){
          if(mesa.usuario.id == this.usuario.id){              
            //alert("entra aca");
            this.ocupaMesa = true;         
            sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));  
            this.estadoPedido();
          }
        }   
              
       });
     });
  }

  ionViewWillEnter(){
    //this.ocupaMesa = this.usuarioService.RelacionUsuarioMesa();
    this.estadoPedido();
  }

  ionViewDidLoad(){
    
  
    this.navBar.backButtonClick = (e:UIEvent)=>{
      
      this.soundsService.sound('logout');
      
      
      let mesa = JSON.parse(sessionStorage.getItem('mesaOcupada'));
      
      this.mesasProvider.LiberarMesa(mesa);
      
      if(this.pedido !== undefined && this.pedido !== null){
          this.pedidoService.actualizarUnPedido(this.pedido.id).update({
            'estado':'cancelado'
          }).then(()=>{
        })
      }  

      sessionStorage.removeItem('mesaOcupada');
      this.ocupaMesa = false;
      this.navCtrl.pop();
    }
  }

  
  ngOnChanges() {
    //this.ocupaMesa = this.usuarioService.RelacionUsuarioMesa();
    
  }



  listaDeEspera(){
    this.navCtrl.push(ListaDeEsperaMenuPage);
  }

  juegos(){
    this.navCtrl.push(PagesJuegosMenuPage, {"pedido": this.pedido}); //TODO Aca deberia enviarsele el id del pedido al cual se le aplicara el descuento
  
  }

  hacerPedido(){
    let mesa = JSON.parse(sessionStorage.getItem('mesaOcupada'));
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));

    this.navCtrl.push(PagesPedidosAltaPage, {
      "mesa": mesa, 
      "cliente": usuario,
      "tipo": "restaurant"
    },null, ); //TODO Aca se le deberia pasar el id del cliente, y el id de la mesa para generar el pedido
  
  }

  OcuparMesa(){
    //this.mesasProvider.CambiarEstadoMesaOcupada();
    //this.HabilitarBotones();
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));

    this.qrService.readQR().then(QRdata => {
      
      let flag = false;
      this.mesasProvider.mesas.forEach((mesa) =>{  

        if(mesa.numero == parseInt(QRdata.text)){          
          flag = true;
          
          if(mesa.estado == 'ocupada' && mesa.usuario.id == JSON.parse(sessionStorage.getItem('usuario')).id){
            this.estadoPedido();
          } 
          
          
          
          if(mesa.estado == 'disponible'){
            
            let mesaUpdate =  new Mesa();
            mesaUpdate = mesa;
            mesaUpdate.estado = 'ocupada';
            mesaUpdate.usuario = usuario;
                    
            this.objFirebase.collection("SP_mesas").doc(mesa.id).set(mesaUpdate).then(() => {
              
            
            console.log('Documento editado exitósamente');
            
            this.ocupaMesa = true;
           

            sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));               

            }, (error) => {
              console.log(error);
            });
          
            

            let toast = this.toastCtrl.create({            
              message: "La mesa nro: "+mesa.numero +" fue ocupada por "+ usuario.nombre,
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();
            
          }else{
            let toast = this.toastCtrl.create({            
              message: "No se puede asignar la mesa nro: "+mesa.numero +" porque se encuentra ocupada",
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();
          }
        }

      });

      if(!flag){
        let toast = this.toastCtrl.create({            
          message: "Codigo QR incorrecto",
          duration: 3000,
          position: 'middle' //middle || top
        });
        toast.present();
      }

    }).catch(err => {
        console.log('Error', err);
    });
  
  }

  // estadoPedido(){
  //   this.pedidoService.traerPedidos().subscribe( pedidos=> {
  //       pedidos.forEach(pedido => {
          
  //         if(pedido.tipo == 'restaurant'){
              
  //           if(pedido.mesaId == JSON.parse(sessionStorage.getItem("mesaOcupada")).id && 
  //               pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id){
  //               this.pedido = pedido; 
  //           }
          
  //         }else{
            
  //           if(pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id){
            
  //             this.pedido = pedido; 
            
  //           }
  //         }         
  //       });

  //   })
  // }

  estadoPedido() {
    let usuarioNoTienePedido =  true;


    this.pedidoService.traerPedidos().subscribe(pedidos => {
      pedidos.forEach(pedido => {
    
        if (  (pedido.tipo == 'restaurant') 
              && (pedido.estado !== 'pagado' && pedido.estado !== 'cancelado') 
              && (pedido.mesaId == JSON.parse(sessionStorage.getItem("mesaOcupada")).id &&
                  pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id)
            ) {            
             
              this.pedido = pedido;
              
            }
        
        if (pedido.tipo == 'delivery' 
            && pedido.estado !== 'pagado' 
            && pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id 
            && pedido.estado !== 'cancelado'
            ) {
                  
           
            this.pedido = pedido;       
           
                        
        }
      
        if(this.pedido !== undefined){
          if(this.pedido.id == pedido.id  && pedido.estado == 'pagado'){          
           
            if(this.pedido.tipo == 'restaurant'){
              sessionStorage.removeItem('mesaOcupada');
              this.ocupaMesa = false;
            } 
            this.pedido =  undefined;
            
            showAlert(this.alertController, "MUCHAS GRACIAS POR ELEGIRNOS!", "Te esperamos nuevamente!", this.soundsService, 'success');
                     
          }

          if(this.pedido.id == pedido.id  && pedido.estado == 'cancelado'){
            showAlert(this.alertController, "LO SENTIMOS!", "TU PEDIDO FUE CANCELADO", this.soundsService, 'error');            
            this.pedido =  undefined;
          }


        }
      });
    })

   
  }

  // HabilitarBotones(){
  //   this.ocupaMesa = this.usuarioService.RelacionUsuarioMesa();
  //   console.log("entro en habililtar botones");
  // }

}
