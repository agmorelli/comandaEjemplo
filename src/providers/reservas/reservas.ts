import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reserva } from '../../clases/Reserva';
import { ToastController } from 'ionic-angular';
import { Mesa } from '../../clases/mesa';

/*
  Generated class for the ReservasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservasProvider {

  private listaReservasFirebase: AngularFirestoreCollection<Reserva>;
  private listaReservasObservable: Observable<Reserva[]>;
  public reservas:Array<Reserva>
  url="https://us-central1-practicaprofesional-dbd4e.cloudfunctions.net/EstadoReserva";
  
  constructor(
    public http: HttpClient,  
    private objFirebase: AngularFirestore,
    public toastCtrl: ToastController) {
      this.reservas = new Array<any>();
    //this.TraerReservas();
  }

    TraerReservas()
  {
    
    this.listaReservasFirebase = this.objFirebase.collection<any>("SP_reservas", ref => ref.orderBy('fecha', 'desc') );

    return this.listaReservasFirebase.snapshotChanges();


  }

 async GuardarReserva(reserva:Reserva)
  {
    let usuario= JSON.parse(sessionStorage.getItem("usuario"));

       //nuevaMesa.codigoQr = encodedData;
       var idReserva = this.objFirebase.createId();
          

       this.objFirebase.collection("SP_reservas").doc(idReserva)
       .set({
        'id': idReserva,
        'fecha': reserva.fecha,
        'hora': reserva.hora,
        'cliente': usuario, 
        'mesas': reserva.mesas,
        'estado': reserva.estado
               
       }).then(res => {

               console.log(res);
               let toast = this.toastCtrl.create({
                 message: "Reservaste la mesa: " + reserva.mesas + " para el dia " + reserva.fecha + "a las "+ reserva.hora ,
                 duration: 3000,
                 position: 'middle' //middle || top
               });
               toast.present();

              // this.altaReservaForm.reset();

             }, err => console.log(err));
  }

 AutorizarReseva(reserva: Reserva)
  {
    reserva.estado="Autorizada";
    
    this.objFirebase.collection("SP_reservas").doc(reserva.id).set(reserva).then(() => {
            
    
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  EnviarNotificacion(idUsuario, estado)
  {
    let direccion= this.url+"?id="+idUsuario+"&estado="+estado;
    return this.http.get(direccion).toPromise();
  }


  CancelarReserva(reserva: Reserva)
  {
    reserva.estado="Cancelada";

    this.objFirebase.collection("SP_reservas").doc(reserva.id).set(reserva).then(() => {
     
      
      console.log('Documento editado exitósamente');

    }, (error) => {
      console.log(error);
    });

  }

  MesaReservada(mesa:Mesa)
  {
    let usuario=JSON.parse(sessionStorage.getItem("usuario"));
    let now=new Date();
    let fecha=now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate();
    let hora=now.getHours()+":"+now.getMinutes();
    let reservada=false;

    let nowMin=((Date.parse(hora)) / 1000 )/ 60;
   
    this.listaReservasFirebase = this.objFirebase.collection<any>("SP_reservas", ref => ref.orderBy('fecha', 'desc') );

     this.listaReservasFirebase.valueChanges()
     .subscribe(array=>{

       array.forEach((reserva:Reserva)=>{

        let reservaMin=(Date.parse(reserva.hora) / 1000) / 60;
      
         if((mesa.numero==reserva.mesas) &&
         (reserva.fecha==fecha) &&
         (nowMin >= reservaMin - 4) &&
         (reserva.estado=="Autorizada"))
         {
           if(usuario.id!= reserva.cliente.id)
           {
            reservada=true;
           }
          
         }
       })
     })
     return reservada;
  }

  
}
