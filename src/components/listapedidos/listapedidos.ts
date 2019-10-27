import { Component, Input } from '@angular/core';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';
import { LoadingController, AlertController } from 'ionic-angular';
import { Producto } from '../../clases/Producto';
import { PedidosProvider } from '../../providers/pedidos/pedidos';


/**
 * Generated class for the ListapedidosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'listapedidos',
  templateUrl: 'listapedidos.html'
})
export class ListapedidosComponent {

  filtroDelivery: boolean;
  listaProductos:Array<Producto>;

  @Input() pedidos: Array<Pedido>;

  constructor(
    private pedidoService: PedidoService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private pedidosProv: PedidosProvider
  ) {
       
      this.filtroDelivery = false;
      
      let usuario =  JSON.parse(sessionStorage.getItem('usuario'));

      if(usuario.tipo == 'delivery'){
        this.filtroDelivery = true;
      } 
    
  }

  //FUNCIONES DELIVERY

  RetirarEntrega(pedido: Pedido){
   
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
        <ion-content padding>
          <img id="spinner" src="assets/img/spinner.gif"> 
        </ion-content>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    
    loading.present();
    
    this.pedidoService.actualizarUnPedido(pedido.id).update({
    
      'estado': 'en_camino'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });

  }

  Entregar(pedido: Pedido){
    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
        <ion-content padding>
          <img id="spinner" src="assets/img/spinner.gif"> 
        </ion-content>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    
    loading.present();
    
    this.pedidoService.actualizarUnPedido(pedido.id).update({
    
      'estado': 'entregado'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });

  }

  buscarCosto(nombre)
  { let prod;
     prod= this.listaProductos.filter((p=>{
       return p.nombre==nombre;
     }));

     return prod[0].precio;
  }

  async Cobrar(pedido: Pedido)
  {
    let total=pedido.costo;
    let propina;

    if(pedido.descuento_10)
    {
      total= total - (total*10)/100;
    }

    
    if(pedido.propina)
    {
      //propina = (total *pedido.propina)/100;
      total += pedido.propina;
    }

    if(pedido.descuento_bebida)
    {
      let bandera=true;
      pedido.productos.forEach((prod: Producto)=>
    {
      
      if(prod.tipo=="bebida" && bandera)
      {
        let precioProducto=this.buscarCosto(prod.nombre)
        console.log(precioProducto);
        total-= precioProducto;
        bandera=false
      }
    })
    }

    if(pedido.descuento_postre)
    {
      let bandera=true;
      pedido.productos.forEach((prod: Producto)=>
    {
      
      if(prod.tipo=="postre" && bandera)
      {
        let precioProducto=this.buscarCosto(prod.nombre)
        total-= precioProducto;
        bandera=false
      }
    }) 
    }
    
    total= Math.floor(total*100)/100;

    const alert = this.alertCtrl.create({
      title: 'Cuenta',
      message: "El total a pagar es de $ " + total,
      buttons: [
        {
          text: 'Pago',
          handler: () => {
            
            let loading = this.loadingController.create({
              spinner: 'hide',
              content: `
                <ion-content padding>
                  <img id="spinner" src="assets/img/spinner.gif"> 
                </ion-content>`,
              duration: 5000
            });
        
            loading.onDidDismiss(() => {
              console.log('Dismissed loading');
            });
            
            loading.present();
            
            this.pedidoService.actualizarUnPedido(pedido.id).update({
            
              'estado': 'pagado'
            
            }).then(() => {
              loading.dismiss();
              console.log('Documento editado exitósamente');
            
            }).catch(err =>{
              loading.dismiss();
              let loadingError = this.loadingController.create({
                spinner: 'hide',
                content: 'Ocurrio un error, por favor intentalo de nuevo',
                duration: 5000
              });
        
              loadingError.present();
        
              
            });
             
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    
    });
    alert.present();


  }






}
