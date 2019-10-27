import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Pedido } from '../../../clases/Pedido';
import { Producto } from '../../../clases/Producto';

@IonicPage()
@Component({
  selector: 'page-pages-pedidos-lista',
  templateUrl: 'pages-pedidos-lista.html',
})
export class PagesPedidosListaPage {

  pedido: Pedido;
  productos: Array<Producto>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.pedido = navParams.get("pedido");
    this.productos = navParams.get("productos");
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
