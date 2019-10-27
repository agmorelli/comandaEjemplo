import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Mensaje } from '../../clases/Mensaje';
import { MensajesProvider } from '../../providers/mensajes/mensajes';

/**
 * Generated class for the PagesChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-chat',
  templateUrl: 'pages-chat.html',
})
export class PagesChatPage {

  listaMensajes: Array<Mensaje>;
  mensaje:string;
  usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private mensajesProv: MensajesProvider) {
    this.TraerMensajes();
    this.usuario=JSON.parse(sessionStorage.getItem("usuario"));
    console.log(this.usuario);
  }

  GuardarMensaje()
  {
    let mensaje = new Mensaje();
    let fecha = new Date();

    mensaje.usuario=this.usuario;
    mensaje.fecha= fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    console.log(mensaje.fecha);
    mensaje.mensaje=this.mensaje;

    this.mensajesProv.GuardarMensaje(mensaje.dameJSON());
    this.mensaje="";

  }

TraerMensajes()
{
  this.mensajesProv.TraerMensajes().subscribe(arr => {
   
    this.listaMensajes = arr.map(function(mensaje, index){
      return mensaje;
    });
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesChatPage');
  }

}
