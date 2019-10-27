import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservasProvider } from '../../providers/reservas/reservas';
import { Reserva } from '../../clases/Reserva';


/**
 * Generated class for the PagesReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-reservas',
  templateUrl: 'pages-reservas.html',
})
export class PagesReservasPage {

  lista_de_reservas: Reserva[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private reservasProv:ReservasProvider ) {
this.TraerReservas();
  }

  async AutorizarReserva(reserva)
  {
    await this.reservasProv.AutorizarReseva(reserva);

    this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data)=>{
      console.log(data);
    });
    this.lista_de_reservas=[];
 
  }

  async CancelarReserva(reserva)
  {
    await this.reservasProv.CancelarReserva(reserva);
     this.reservasProv.EnviarNotificacion(reserva.cliente.id, reserva.estado).then((data)=>{
      console.log(data);
    });
    this.lista_de_reservas=[];
    
  }



  async TraerReservas()
  {
    this.lista_de_reservas= new Array<Reserva>();
    this.reservasProv.TraerReservas().subscribe( (arr)=>{  
     arr.forEach((res: any) => {
       //console.log(res[0].payload.doc.data()) ;
        this.lista_de_reservas.push(res.payload.doc.data());
      })

     
      
      
    })

    console.log(this.lista_de_reservas);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesReservasPage');
  }

}
