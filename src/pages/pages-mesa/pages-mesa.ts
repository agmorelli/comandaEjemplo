import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { Pedido } from '../../clases/Pedido';
import { PagesPedidosAltaPage } from '../pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { Producto } from '../../clases/Producto';
import { ProductoService } from '../../services/producto-service';
import { MesasProvider } from '../../providers/mesas/mesas';

/**
 * Generated class for the PagesMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-mesa',
  templateUrl: 'pages-mesa.html',
})
export class PagesMesaPage {

  mesa;
  listaPedidos:Array<Pedido>;
  listaProductos:Array<Producto>;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private pedidosProv: PedidosProvider,
  private alertCtrl: AlertController,
  private productoServ: ProductoService,
  private mesaProv:MesasProvider
  ) {
    this.listaPedidos= new Array<Pedido>();
    this.mesa=this.navParams.get("mesa");
    this.TraerPedidos();
    this.traerProductos();
   
  }

  AceptarPedido(pedido: Pedido)
  {
    this.pedidosProv.AceptarPedido(pedido);
  }

  ServirPedido(pedido: Pedido)
  {
    this.pedidosProv.ServirPedido(pedido);
  }


  TomarPedido()
  {
    this.navCtrl.push(PagesPedidosAltaPage, {"mesa": this.mesa, "cliente": this.mesa.usuario, "tipo": "restaurant"})
  }

  traerProductos()
  {
    this.listaProductos= new Array<Producto>();
    this.productoServ.traerProductos().subscribe(prodcutos=>{
      prodcutos.forEach(producto=>{
        this.listaProductos.push(producto);
      })
    })
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
             this.pedidosProv.Cobrar(pedido);
             
             this.navCtrl.pop().then(()=>{this.mesaProv.LiberarMesa(this.mesa)})
             
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



  TraerPedidos()
  {
    
    console.log("mesa: " +this.mesa.id);
    this.pedidosProv.TraerPedidos().subscribe((pedidos)=>{
      console.log(pedidos)
      this.listaPedidos = pedidos.filter((pedido)=>{
       
        return pedido.mesaId == this.mesa.id && pedido.estado != "pagado";


      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesMesaPage');
  }

}
