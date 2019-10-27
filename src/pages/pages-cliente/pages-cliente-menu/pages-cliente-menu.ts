import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Navbar, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { PagesReservaPage } from '../../pages-reserva/pages-reserva';
import { ListaDeEsperaMenuPage } from '../../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesJuegosMenuPage } from '../../pages-juegos/pages-juegos-menu/pages-juegos-menu';
import { PagesPedidosAltaPage } from '../../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { Mesa } from '../../../clases/mesa';
import { Usuario } from '../../../clases/usuario';
import { Pedido } from '../../../clases/Pedido';
import { UsuarioService } from '../../../services/usuario-service';
import { PedidoService } from '../../../services/pedidos-service'
import { QRService } from '../../../services/QR-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MesasProvider } from '../../../providers/mesas/mesas';
import { SoundsService } from '../../../services/sounds-service';
import { PagesChatPage } from '../../pages-chat/pages-chat';
import { ReservasProvider } from '../../../providers/reservas/reservas';
import { getImageURL, SPINNER_IMG, showAlert, round, spin } from '../../../environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PagesEncuestaClientePage } from '../../pages-encuesta-cliente/pages-encuesta-cliente';



@IonicPage()
@Component({
  selector: 'pages-cliente-menu',
  templateUrl: 'pages-cliente-menu.html',
})
export class PagesClienteMenuPage {

  @ViewChild(Navbar) navBar: Navbar;

  reservaPage = PagesReservaPage;

  mesa: Mesa;
  usuario: Usuario;
  ocupaMesa:boolean;
  pedido: Pedido;
  tieneChat: boolean;
  mesasSubscription: any;
  pedidosSubscription: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    public toastCtrl: ToastController,
    private qrService: QRService,
    private objFirebase: AngularFirestore,
    private mesasProvider: MesasProvider,
    private soundsService: SoundsService,
    private rservasProvider: ReservasProvider,
    private alertController: AlertController
  ) {
    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    
     //.unsubscribe();
  
  
  }

  ionViewWillEnter() {
    console.log("entro en ionViewWillEnter");
    //this.ocupaMesa = this.usuarioService.RelacionUsuarioMesa();

    this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
    
    if(sessionStorage.getItem("mesaOcupada") !== null && sessionStorage.getItem("mesaOcupada") !== undefined ){
      this.ocupaMesa = true;
    }else{
      this.ocupaMesa =  false;
    }

    this.mesasSubscription = this.mesasProvider.listaMesasObservable.subscribe(arr => {
       console.log("Entro al subscribe en ionViewWillEnter");     
       arr.forEach((mesa: Mesa) => {
        if(mesa.usuario !== undefined && mesa.usuario !== null){
          if(mesa.usuario.id == this.usuario.id){              
            console.log("entro a buscar las mesas");
            this.ocupaMesa = true;         
            this.mesa = mesa;
            sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));  
            this.estadoPedido();
          }
        }   
              
       });
     });
     
     this.estadoPedido();

     this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
      //sessionStorage.clear();
      //console.log("deberia unsubscribe");
      this.mesasSubscription.unsubscribe();
      this.pedidosSubscription.unsubscribe();
    }

  
    }
  
    


  ionViewDidLoad(){
    // this.navBar.backButtonClick = (e:UIEvent)=>{
    //   this.soundsService.sound('logout');
    //   this.navCtrl.pop();
    //   // sessionStorage.clear();
    //   //console.log("deberia unsubscribe");
    //   //this.mesasSubscription.unsubscribe();
    // }
  
  }

  // pedidoEstaPago(pago: boolean){
  //   alert("entro");
  //   if(pago){
  //     alert("ESTA PAGO");
  //     this.pedido = null;
  //     this.estadoPedido
      
  //     this.ocupaMesa = false;
  //     sessionStorage.removeItem('mesaOcupada');
  //   }
  // }



  reserva() {
    this.navCtrl.push(this.reservaPage);
  }

  listaDeEspera() {
    this.navCtrl.push(ListaDeEsperaMenuPage);
  }

  juegos() {
    this.navCtrl.push(PagesJuegosMenuPage, { "pedido": this.pedido }); //TODO Aca deberia enviarsele el id del pedido al cual se le aplicara el descuento
  }                                                                     //18/06: Se agrega el id de pedido, validar funcionamiento

  hacerPedido() {
    this.mesa = JSON.parse(sessionStorage.getItem("mesaOcupada"));

    this.navCtrl.push(PagesPedidosAltaPage, {
      "mesa": this.mesa,
      "cliente": this.usuario,
      "tipo": "restaurant"
    });
  }

  pedirDelivery() {
    this.navCtrl.push(PagesPedidosAltaPage, {
      "cliente": this.usuario,
      "tipo": "delivery"
    });
  }

  estadoPedido() {
    console.log("Entro a buscar los pedidos");

    this.pedidosSubscription = this.pedidoService.traerPedidos().subscribe(pedidos => {
      pedidos.forEach(pedido => {
    
        if (  (pedido.tipo == 'restaurant') 
              && (pedido.estado !== 'pagado' && pedido.estado !== 'cancelado') 
              && (pedido.mesaId == JSON.parse(sessionStorage.getItem("mesaOcupada")).id &&
                  pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id)
            ) {            
             
              console.log("encontro el pedido");
              this.pedido = pedido;
              console.log(this.pedido);
            }
        
        if (pedido.tipo == 'delivery' 
            && pedido.estado !== 'pagado' 
            && pedido.cliente.id == JSON.parse(sessionStorage.getItem("usuario")).id 
            && pedido.estado !== 'cancelado'
            ) {
                  
            this.pedido = pedido;       
            this.tieneChat= true;  
                        
        }
      
        if(this.pedido !== undefined && this.pedido !== null){
          if(this.pedido.id == pedido.id  && pedido.estado == 'pagado'){          
            
            this.tieneChat =  false;
            if(this.pedido.tipo == 'restaurant'){
              sessionStorage.removeItem('mesaOcupada');
              this.ocupaMesa = false;
              console.log("removio la mesa");
            } 
            this.pedido =  undefined;
            
            showAlert(this.alertController, "MUCHAS GRACIAS POR ELEGIRNOS!", "Te esperamos nuevamente!", this.soundsService, 'success');
                     
          }

        if(this.pedido !== undefined && this.pedido !== null){  
          if(this.pedido.id == pedido.id  && pedido.estado == 'cancelado'){
            this.tieneChat =  false;
            showAlert(this.alertController, "LO SENTIMOS!", "TU PEDIDO FUE CANCELADO", this.soundsService, 'error');            
            this.pedido =  undefined;
          }
        }  

        }
      });
    })

   
  }

  OcuparMesa() {
    this.mesasProvider.TraerMesas();

    var usuario = JSON.parse(sessionStorage.getItem('usuario'));

    this.qrService.readQR().then(QRdata => {

      let flag = false;
      this.mesasProvider.mesas.forEach((mesa) => {

        if (mesa.numero == parseInt(QRdata.text)) {
          flag = true;

          if (mesa.estado == 'ocupada' && mesa.usuario.id == JSON.parse(sessionStorage.getItem('usuario')).id) {
            this.estadoPedido();
          }

          if ((mesa.estado == 'disponible') && (this.rservasProvider.MesaReservada(mesa)==false) ) {

            let mesaUpdate = new Mesa();
            mesaUpdate = mesa;
            mesaUpdate.estado = 'ocupada';
            mesaUpdate.usuario = usuario;

            this.objFirebase.collection("SP_mesas").doc(mesa.id).set(mesaUpdate).then(() => {

              console.log('Documento editado exitósamente');

              this.ocupaMesa = true;

              this.estadoPedido();
              
              sessionStorage.setItem("mesaOcupada", JSON.stringify(mesa));

            }, (error) => {
              console.log(error);
            });

            let toast = this.toastCtrl.create({
              message: "La mesa nro: " + mesa.numero + " fue ocupada por " + usuario.nombre,
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();

          } else {
            let toast = this.toastCtrl.create({
              message: "No se puede asignar la mesa nro: " + mesa.numero + " porque se encuentra ocupada",
              duration: 3000,
              position: 'middle' //middle || top
            });
            toast.present();
          }
        }

      });

      if (!flag) {
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

  Chat()
  {
    this.navCtrl.push(PagesChatPage);
  }

  ValidarChatCargosos()
  {
    if(this.pedido)
    {
      if(this.pedido.tipo=='delivery' && this.pedido.estado=='en_camino')
      {
        this.tieneChat= true;
      }
    }
    else{
      this.tieneChat= false;
    }
  }

  Encuesta()
  {
    this.navCtrl.push(PagesEncuestaClientePage,{"pedido":this.pedido});
  }


}
