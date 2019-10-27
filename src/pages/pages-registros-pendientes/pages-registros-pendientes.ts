import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../clases/usuario';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpMailProvider } from '../../providers/http-mail/http-mail';

/**
 * Generated class for the PagesRegistrosPendientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-registros-pendientes',
  templateUrl: 'pages-registros-pendientes.html',
})
export class PagesRegistrosPendientesPage {

  listaPendientes:Array<Usuario>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private usrSer: UsuarioService, 
    private emailComposer: EmailComposer, 
    public toastCtrl: ToastController,
    private mailProd: HttpMailProvider) {
    this.listaPendientes= new Array<Usuario>();
    this.TraerPendientes();
  }

 async TraerPendientes()
  {
    this.usrSer.traerUsuarios().subscribe((usrs)=>{
      
      this.listaPendientes = usrs.filter(usr=>{return usr.estado=="Pendiente"});

    })
   
  }

  AceptarUsuario(usuario)
  {
console.log(usuario.id);
    this.mailProd.EnviarMail(usuario.email,usuario.id)
    .then((data)=>{

      console.log(data);

      let toast = this.toastCtrl.create({
        message: "Correo de confirmacion enviado.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })
    .catch((data)=>{
      console.log(data);

      let toast = this.toastCtrl.create({
        message: "Correo de confirmacion enviado.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })


  }

  async RechazarUsuario(usuario)
  {
    this.usrSer.EliminarUsuario(usuario.id).then((data)=>{
      console.log(data);

      let toast = this.toastCtrl.create({
        message: "Usuario eliminado.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })
    .catch((data)=>{
      console.log(data);
      let toast = this.toastCtrl.create({
        message: "Error al eliminar usuario.",
        duration: 3000,
        position: 'middle' //middle || top
      });
      toast.present();
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesRegistrosPendientesPage');
  }

}
