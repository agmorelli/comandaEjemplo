import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, DateTime } from 'ionic-angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Reserva } from '../../clases/Reserva';
import { Usuario } from '../../clases/usuario';
import { Observable } from 'rxjs/Observable';
import { MesasProvider } from '../../providers/mesas/mesas';
import { Mesa } from '../../clases/mesa';
import { ReservasProvider } from '../../providers/reservas/reservas';

/**
 * Generated class for the PagesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-reserva',
  templateUrl: 'pages-reserva.html',
})
export class PagesReservaPage {


  private listaReservasFirebase: AngularFirestoreCollection<Reserva>;
  private listaReservasObservable: Observable<Reserva[]>;
  reservas: Array<Reserva>;
  usuario:Usuario;
  mesas;
  hoy:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    private mesasProv: MesasProvider,
    private reservaProv: ReservasProvider) 
    {

    this.usuario=JSON.parse(sessionStorage.getItem("usuario")); 
    this.TraerReservas();

    let t=new Date();
    
   this.hoy=t.getFullYear() + "-0" + t.getMonth()+ "-" + t.getDate();
 
  }


fecha = new FormControl('', [
  Validators.required
]);
hora = new FormControl('', [
  Validators.required
]);

cant_comensales = new FormControl('', [
  Validators.required,
]);

vip = new FormControl('', [
  
]);


registroForm: FormGroup = this.builder.group({
  fecha: this.fecha,
  hora: this.hora,
  cant_comensales: this.cant_comensales,
  vip: this.vip,

  
});

Registrar()
{

  let reserva= new Reserva();

  reserva.fecha= this.registroForm.get('fecha').value;
  
  reserva.hora= this.registroForm.get('hora').value;
  reserva.cliente= this.usuario;
  let cant_comensales= this.registroForm.get('cant_comensales').value;
  let tipo;
  this.registroForm.get('vip').value ? tipo ="discapacitados" : tipo = "vip";
  this.BuscarMesaReserva(reserva.fecha,reserva.hora , cant_comensales,tipo);

}


 BuscarMesaReserva(fecha,hora, cant_comensales, tipo)
{
  let laReserva: Reserva;
  let disponible: boolean= true;
  let ok:boolean= true;

  let mesasAdecuadas= this.mesasProv.mesas.filter((mesa)=>{
    return (mesa.cantidadComensales >= cant_comensales && mesa.tipoMesa== tipo);
  } );
//console.log(this.reservas);
mesasAdecuadas.forEach(async (mesa)=>
{
  disponible=true;
  
  if(ok)
  {
  this.reservas.forEach((reserva)=>
{
 //console.log(reserva.fecha + " " + reserva.mesas );
 let fechaAReservar = new Date(fecha+" "+ hora);
 let fechaRservada = new Date(reserva.fecha+" "+reserva.hora);
 let minReserva=((Date.parse(fechaRservada.toString())) / 1000 )/ 60;
 let minLaReserva=(Date.parse(fechaAReservar.toString()) / 1000) / 60;

/*
 console.log(reserva.mesas);
 console.log(mesa.numero);
 console.log(reserva.fecha);
 console.log(fecha);*/
 //&& (minLaReserva > minReserva - 30 && minLaReserva < minReserva + 30)

 

  if((mesa.numero == reserva.mesas && 
    reserva.fecha == fecha) &&(minLaReserva > minReserva - 30 && minLaReserva < minReserva + 30))
  {
    
    disponible=false;
  }

})
  
if(disponible)
{
  
  laReserva = new Reserva();
  laReserva.mesas=mesa.numero;
  laReserva.fecha=fecha;
  laReserva.hora=hora;
  laReserva.cliente=this.usuario;
  laReserva.estado="pendiente";
  ok=false;

  await this.reservaProv.GuardarReserva(laReserva);
  
  
}

}

})
 
  if(!disponible)
  {
    let toast = this.toastCtrl.create({
      message: "Lo sientimos, no hay mesas disponibles para esa fecha/horario" ,
      duration: 3000,
      position: 'middle' //middle || top
    });
    toast.present();
  }

 
   //this.TraerReservas();
   console.log(this.reservas);
}

async TraerReservas()
{
  this.reservas= new Array<Reserva>();
  this.reservaProv.TraerReservas().subscribe( (arr)=>{  
   arr.forEach((res: any) => {
     //console.log(res[0].payload.doc.data()) ;
      this.reservas.push(res.payload.doc.data());
    })

   
    
    
  })

  console.log(this.reservas);
}



  ionViewDidLoad() {
    let t=new Date();
    

    this.hoy=t.getFullYear() + "-0" + (t.getMonth()+1)+ "-" + t.getDate();
    console.log('ionViewDidLoad PagesReservaPage');
  }

}
