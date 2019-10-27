import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Pedido } from '../clases/Pedido';

@Injectable()
export class PedidoService {

  private listaPedidosFirebase: AngularFirestoreCollection<Pedido>;
  private listaPedidosObservable: Observable<Pedido[]>;

  constructor(
    public alertCtrl: AlertController,
    private objFirebase: AngularFirestore,
    public modalCtrl: ModalController
  ) {

  }

  traerPedidos() {
    this.listaPedidosFirebase = this.objFirebase.collection<Pedido>("SP_pedidos");
    this.listaPedidosObservable = this.listaPedidosFirebase.valueChanges();
    return this.listaPedidosObservable;
  }

  cargarPedido(pedidoAGuardarJSON: any) {

    let id = this.objFirebase.createId();
    pedidoAGuardarJSON.id = id;
    //  return this.objFirebase.collection<Pedido>("SP_pedidos").add(pedidoAGuardarJSON);
    return this.objFirebase.collection<Pedido>("SP_pedidos").doc(id).set(pedidoAGuardarJSON);

  }

  traerUnPedido(idPedido: string) {
    let pedido = this.objFirebase.collection<Pedido>("SP_pedidos").doc(idPedido);
    let pedidoObservable = pedido.valueChanges();
    return pedidoObservable;

  }

  actualizarUnPedido(idPedido: string) {
    let pedidoActualizar = this.objFirebase.collection<Pedido>("SP_pedidos").doc(idPedido);
    //let pedidoObservable = pedido.valueChanges();
    return pedidoActualizar;
  }

}