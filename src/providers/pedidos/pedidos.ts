import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Pedido } from '../../clases/Pedido';

/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {


  
  pedidos: any;
  listaPedidosFirebase: AngularFirestoreCollection<any>;
  constructor(public http: HttpClient,
    private objFirebase: AngularFirestore) {
    
  }

  TraerPedidos()
  {

    this.listaPedidosFirebase = this.objFirebase.collection<Pedido>("SP_pedidos");
    this.pedidos= this.listaPedidosFirebase.valueChanges();
    return this.pedidos;
    
  }

 async AceptarPedido(pedido: Pedido)
  {
    pedido.estado="pendiente";
    
    this.objFirebase.collection("SP_pedidos").doc(pedido.id).set(pedido).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  async CancelarPedido(pedido: Pedido)
  {
    pedido.estado="cancelado";
    
    this.objFirebase.collection("SP_pedidos").doc(pedido.id).set(pedido).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }


  async Cobrar(pedido: Pedido)
  {
    pedido.estado="pagado";
    
    this.objFirebase.collection("SP_pedidos").doc(pedido.id).set(pedido).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

 async ServirPedido(pedido: Pedido)
  {
    pedido.estado="entregado";
    
    this.objFirebase.collection("SP_pedidos").doc(pedido.id).set(pedido).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }



}
