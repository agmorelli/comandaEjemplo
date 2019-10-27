import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';
import { SoundsService } from '../../services/sounds-service';
import { PagesChatPage } from '../pages-chat/pages-chat';

@IonicPage()
@Component({
  selector: 'page-pages-delivery-boy',
  templateUrl: 'pages-delivery-boy.html',
})
export class PagesDeliveryBoyPage {

  pedidos: Array<Pedido>;

  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidosService: PedidoService,
    private soundsService: SoundsService
    ) {
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
     }
  }

  CargarPedidosPendientes(filtro: string){
    
    this.pedidosService.traerPedidos().subscribe( pedidos => {
      var array = new Array<Pedido>();
      pedidos.forEach(pedido => {
        array.push(pedido);      
      });
    
      
      this.pedidos = array.filter( pedido =>   pedido.tipo == 'delivery' && pedido.estado !== 'pagado');
      //this.pedidos = array.filter( pedido => pedido.estado == filtro );
      
      this.pedidos.forEach( pedido => {
        pedido.productos.forEach( (producto,index) => {
          producto.id = index;
        })
      })

      console.log(this.pedidos);

      

      /*
      this.pedidos.forEach( pedido =>{
        pedido.productos = pedido.productos.filter( producto => producto.tipo == 'comida');
      })
      */
     
    })
   
  }


  Chat()
  {
    this.navCtrl.push(PagesChatPage);
  }

}
