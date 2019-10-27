import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../clases/Producto';

@Injectable()
export class ProductoService {

  private listaProductosFirebase: AngularFirestoreCollection<Producto>;
  private listaProductosObservable: Observable<Producto[]>;
  
	constructor(
      public alertCtrl: AlertController,
      private objFirebase: AngularFirestore,
      public modalCtrl: ModalController
    ) {

	}

  traerProductos() {
    this.listaProductosFirebase = this.objFirebase.collection<Producto>("SP_productos", ref => ref.orderBy('nombre', 'asc') );
    this.listaProductosObservable = this.listaProductosFirebase.valueChanges();
    return this.listaProductosObservable;
  }

  cargarProducto(productoAGuardarJSON: any){
    let id = this.objFirebase.createId();

    productoAGuardarJSON.id = id;
    
    //return this.objFirebase.collection<Producto>("SP_productos").add(productoAGuardarJSON);
    return this.objFirebase.collection<Producto>("SP_productos").doc(id).set(productoAGuardarJSON);
  
  }

}