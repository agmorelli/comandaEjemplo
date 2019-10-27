import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../../clases/Mensaje';

/*
  Generated class for the MensajesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensajesProvider {

  private mensajesFirebase: AngularFirestoreCollection<Mensaje>;
  private mensajesObservable: Observable<Mensaje[]>;
  
  constructor(public http: HttpClient,
    private objFirebase: AngularFirestore) {
    console.log('Hello MensajesProvider Provider');
  }

  TraerMensajes(){
    this.mensajesFirebase = this.objFirebase.collection<any>("SP_mensajes", ref => ref.orderBy('fecha', 'desc') );
    this.mensajesObservable = this.mensajesFirebase.valueChanges();
    return this.mensajesObservable;
  }


  GuardarMensaje(mensaje) {

    let id = this.objFirebase.createId();
    mensaje.id = id;
    
     this.objFirebase.collection<any>("SP_mensajes").doc(id).set(mensaje).then((data)=>{
       console.log(data);
     })

  }

}
