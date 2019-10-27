import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { Pedido } from '../../clases/Pedido';

/**
 * Generated class for the PagesPedidosPendientesMozoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-pendientes-mozo',
  templateUrl: 'pages-pedidos-pendientes-mozo.html',
})
export class PagesPedidosPendientesMozoPage {

  listaPedidos:Array<Pedido>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private pedidosProv: PedidosProvider) {
    this.listaPedidos= new Array<Pedido>();
  
    this.TraerPedidos();
    console.log(this.listaPedidos);
  }


  TraerPedidos()
  {
    
  
    this.pedidosProv.TraerPedidos().subscribe((pedidos)=>{
      console.log(pedidos)
      this.listaPedidos = pedidos.filter((pedido)=>{
       
        return pedido.estado == "solicitado";


      });

    });

  }


  AceptarPedido(pedido: Pedido)
  {
    this.pedidosProv.AceptarPedido(pedido);
  }

  CancelarPedido(pedido: Pedido)
  {
    this.pedidosProv.CancelarPedido(pedido);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesPedidosPendientesMozoPage');
  }

}
