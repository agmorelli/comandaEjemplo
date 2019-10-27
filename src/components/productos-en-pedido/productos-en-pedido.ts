import { Component, Input, OnChanges } from '@angular/core';
import { Producto } from '../../clases/Producto';
import { PedidoService } from '../../services/pedidos-service';
import { Pedido } from '../../clases/Pedido';
import { LoadingController } from 'ionic-angular'
import { hostViewClassName } from '@angular/compiler';
import { Usuario } from '../../clases/usuario';

/**
 * Generated class for the ProductosEnPedidoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'productos-en-pedido',
  templateUrl: 'productos-en-pedido.html'
})
export class ProductosEnPedidoComponent {


  // @Input() idPedido: string;
  // @Input() arrayProductos: Array<Producto>;
  @Input() pedido: Pedido;
  productosFiltrados: Array<Pedido>
  filtroTipo: string;
  esCliente: boolean;  


  constructor(
    private pedidoService: PedidoService,
    public loadingController: LoadingController

  ) {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if(usuario.perfil == 'anonimo' || usuario.perfil == 'cliente' ){
      this.esCliente = true;
    }else{
      switch (usuario.tipo) {
        case 'bartender':
          this.filtroTipo = 'bebida';
          break;

        case 'cocinero':
          this.filtroTipo = 'comida';
          break;    
      }
    }  
  }

  ngOnChanges() {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    
    if(usuario.perfil == 'anonimo' ||  usuario.perfil == 'cliente'){
      this.esCliente = true;
      this.productosFiltrados = this.pedido.productos;
      console.log(this.productosFiltrados);
    }
    else{
      this.productosFiltrados = this.pedido.productos.filter(producto => producto.tipo == this.filtroTipo);
    }
  }

  CambiarEstado(index: number, estado: string) {

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

    this.pedido.productos[index].estado = estado;
    this.pedido.estado = 'proceso';
    
    
    //AVERIGUAMOS SI TODOS LOS PRODUCTOS DEL ESTAN TERMINADOS
    let cantidadProductos;
    var cuenta = 0;
    cantidadProductos = this.pedido.productos.length

    this.pedido.productos.forEach( producto =>{
      
      if(producto.estado == 'terminado'){
        cuenta =  cuenta + 1;
        console.log(cuenta);
      }     
    })

    if(cuenta == cantidadProductos && this.pedido.estado == 'proceso'){
      this.pedido.estado = 'terminado'
    }



    this.pedidoService.actualizarUnPedido(this.pedido.id).update(this.pedido).then(() => {
      


      
      loading.dismiss();
      console.log('Documento editado exitósamente');
    })

  }

}
