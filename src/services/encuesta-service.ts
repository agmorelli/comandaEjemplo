import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ModalController, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Encuesta_supervisor } from '../clases/encuesta_supervisor';
import { Encuesta_empleado } from '../clases/Encuesta_empleado'
import { EncuestaCliente } from '../clases/Encuesta_cliente';

@Injectable()
export class EncuestaService {

    private listaEncuestasFirebase: AngularFirestoreCollection<Encuesta_supervisor>;
    private listaEncuestasObservable: Observable<Encuesta_supervisor[]>;
    
    private listaEncuestasIngresoEmpleadoFirebase: AngularFirestoreCollection<Encuesta_empleado>;
    private listaEncuestasIngresoEmpleadoObservable: Observable<Encuesta_empleado[]>;
    //Encuesta_empleado

      constructor(
        public alertCtrl: AlertController,
        private objFirebase: AngularFirestore,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController
      ) {
  
      }
  
    traerEncuestas() {
      this.listaEncuestasFirebase = this.objFirebase.collection<Encuesta_supervisor>("SP_encuestas_supervisor");
      this.listaEncuestasObservable = this.listaEncuestasFirebase.valueChanges();
      return this.listaEncuestasObservable;
    }
  
    cargarEncuesta(encuestaAGuardarJSON: any){
      return this.objFirebase.collection<Encuesta_supervisor>("SP_encuestas_supervisor").add(encuestaAGuardarJSON);
    }

    traerEncuestasEmpleados(){
      this.listaEncuestasIngresoEmpleadoFirebase = this.objFirebase.collection<Encuesta_empleado>("SP_encuestas_ingreso_empleado");
      this.listaEncuestasIngresoEmpleadoObservable = this.listaEncuestasIngresoEmpleadoFirebase.valueChanges();
      return this.listaEncuestasIngresoEmpleadoObservable;
    }

    cargarEncuestaEmpleado(encuestaAGuardarJSON: any){
      return this.objFirebase.collection<Encuesta_empleado>("SP_encuestas_ingreso_empleado").add(encuestaAGuardarJSON);
    }

    cargarEncuestaCliente(encuestaAGuardarJSON: any){
      let id=this.objFirebase.createId();
      this.objFirebase.collection<any>("SP_encuestas_cliente").doc(id).set(encuestaAGuardarJSON).then((data)=>{
        let toast = this.toastCtrl.create({
          message: "Gracias por compartir tu opinion.",
          duration: 3000,
          position: 'middle' //middle || top
        });
        
        toast.present();
        console.log(data);
      })
    }

}