import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ProductoAltaPage } from '../../pages-producto/pages-producto-alta/pages-producto-alta';
import { PedidoService } from '../../../services/pedidos-service';
import { Pedido } from '../../../clases/Pedido';
import { SoundsService } from '../../../services/sounds-service';
import { PagesProductoCargaMasivaPage } from '../../pages-producto/pages-producto-carga-masiva/pages-producto-carga-masiva';
import { PagesProductoListaPage } from '../../pages-producto/pages-producto-lista/pages-producto-lista';


@IonicPage()
@Component({
  selector: 'bartender-page-menu',
  templateUrl: 'pages-bartender-menu.html',
})
export class BartenderMenuPage {

  pedidos: Array<Pedido>;

  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    public pedidosService: PedidoService,
    private soundsService: SoundsService
  ) {
    //this.CargarPedidosPendientes();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.soundsService.sound('logout');
      this.navCtrl.pop();
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Crear',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(ProductoAltaPage);
        }
      }, {
        text: 'Descarga/carga masiva',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(PagesProductoCargaMasivaPage);
        }
      }, {
        text: 'Lista',
        icon: 'list-box',
        handler: () => {
          this.navCtrl.push(PagesProductoListaPage);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }


  CargarPedidosPendientes(filtro: string) {
    //SE TRAEN TODOS LOS PEDIDOS.
    this.pedidosService.traerPedidos().subscribe(pedidos => {
      var array = new Array<Pedido>();
      pedidos.forEach(pedido => {
        array.push(pedido);
      });


      // SE FILTRAN LOS PEDIDOS PENDIENTES
      this.pedidos = array.filter(pedido => pedido.estado == filtro || pedido.estado == 'proceso');


      //POR CADA PEDIDO UN ARRAY DE PRODUCTOS. SE LE ASIGNA EL ID DE ACUERDO AL INDICE
      //PARA PODER FILTRAR Y SABER EXACTAMENTE QUE SE DEBE MODIFICAR.
      this.pedidos.forEach(pedido => {
        pedido.productos.forEach((producto, index) => {
          producto.id = index;
        })
      })


      /* Aca se puede agregar un filtro para los productos de this.pedidos.productos 
      Por tipo de producto / responsable.
      
      */

    })


  }



}
