import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Usuario } from "../../clases/usuario";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

import { User } from "../../providers";
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";

import { PagesDuenoMenuPage } from "../pages-dueno/pages-dueno-menu/pages-dueno-menu";
import { PagesSupervisorPage } from "../pages-supervisor/pages-supervisor";
import { PagesEmpleadoPage } from "../pages-empleado/pages-empleado";
import { PagesClienteMenuPage } from "../pages-cliente/pages-cliente-menu/pages-cliente-menu";
import { PagesClienteAnonimoPage } from "../pages-cliente-anonimo/pages-cliente-anonimo";
import { PagesRegistroUsuarioPage } from "../pages-registro-usuario/pages-registro-usuario";
import { BartenderMenuPage } from "../pages-bartender/pages-bartender-menu/pages-bartender-menu";
import { CocineroMenuPage } from "../pages-cocinero/pages-cocinero-menu/pages-cocinero-menu";
import { Platform } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { PagesMozoPage } from "../pages-mozo/pages-mozo";
import { PagesDeliveryBoyPage } from "../pages-delivery-boy/pages-delivery-boy";
import { EncuestaService } from '../../services/encuesta-service';
import { PagesEncuestaIngresoEmpleadoPage} from '../../pages/pages-encuesta-ingreso-empleado/pages-encuesta-ingreso-empleado';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  coleccionTipadaFirebase: AngularFirestoreCollection<Usuario>;
  ListadoUsuariosObservable: Observable<Usuario[]>;

  usuarioLogeado: any;

  loginFields: { email: string, clave: string } = {
    email: "",
    clave: ""
  };

  splash = true;
  accounts: Array<Usuario>;

  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public modalVotacion: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public objFirebase: AngularFirestore,
    public platform: Platform,
    public fcm: FcmProvider,
    public encuestaService: EncuestaService
  ) {
    this.translateService.get("LOGIN_ERROR").subscribe(value => {
      this.loginErrorString = value;
    });
  }

  ingresoAnonimo(){
    this.navCtrl.push(PagesClienteAnonimoPage);
  }  

  doLogin() {
    if (this.loginFields.email == "" || this.loginFields.clave == "") {
      let toast = this.toastCtrl.create({
        message: "Debe indicar usuario y contraseña",
        duration: 4000,
        position: "middle" //middle || top
      });
      toast.present();
    } else {
      let modal = this.modalVotacion.create(SpinnerPage);
      modal.present();
      this.coleccionTipadaFirebase = this.objFirebase.collection<Usuario>("SP_usuarios");
      this.ListadoUsuariosObservable = this.coleccionTipadaFirebase.valueChanges();
      this.ListadoUsuariosObservable.forEach(el => {
        this.accounts = el;
        let user: Usuario = this.accounts.find(
          elem =>
            this.loginFields.email == elem.email &&
            this.loginFields.clave == elem.clave
        );
        modal.dismiss();
        if (user !== undefined) {
          sessionStorage.setItem("usuario", JSON.stringify(user));

          //Si estoy en el dispositivo guardo el token para push
          if(this.platform.is('cordova')){
            this.fcm.getToken()
          }
          /* SWITCH CON DIFERENTES PERFILES */

          switch (user.perfil) {
            case "supervisor":
              this.navCtrl.push(PagesSupervisorPage);
              break;

            case "empleado":
              
              let test = this.encuestaService.traerEncuestasEmpleados().subscribe( encuestas =>{
                
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;
                var yyyy = today.getFullYear();

                let hoy = mm + '/' + dd + '/' + yyyy;
                
                let realizaEncuesta = false;

                encuestas.forEach(encuesta => {
                 let fechaenEncuesta = new Date(encuesta.timestamp);

                  var diaEncuesta = fechaenEncuesta.getDate();
                  var mesEncuesta = fechaenEncuesta.getMonth()+1; //January is 0!
                  var anioEncuesta = fechaenEncuesta.getFullYear();
  
                  let fechaEncuesta = mesEncuesta + '/' + diaEncuesta + '/' + anioEncuesta;
                  console.log(hoy+' '+fechaEncuesta );

                  if(hoy == fechaEncuesta && encuesta.empleadoId == user.id){

                    realizaEncuesta =  true;
                    test.unsubscribe();
                    switch(user.tipo) {
                      case "cocinero":
      
                        this.navCtrl.push(CocineroMenuPage);
                        break;
      
                      case "bartender":
                        this.navCtrl.push(BartenderMenuPage);
                        break;
      
                      case "mozo":
                        this.navCtrl.push(PagesMozoPage);
                        break;
                         
                      case "delivery":
                          this.navCtrl.push(PagesDeliveryBoyPage);
                          break;
                    }
                  }                  
                });

                
                if(!realizaEncuesta){
                  test.unsubscribe();
                  this.navCtrl.push(PagesEncuestaIngresoEmpleadoPage, { "usuario": user });            
                }





              })
             
            break;
              
            case "cliente":
            if(user.estado=="Registrado")
            {
              this.navCtrl.push(PagesClienteMenuPage);

            }
            else{
              let toast = this.toastCtrl.create({
                message: "Verificacion pendiente.",
                duration: 4000,
                position: "bottom" //middle || top
              });
              toast.present();
            }
              
              break;

            case "dueno":
              this.navCtrl.push(PagesDuenoMenuPage);
              break;

            default:
              break;
          }
        } else {
          let toast = this.toastCtrl.create({
            message: "Acceso denegado.",
            duration: 4000,
            position: "bottom" //middle || top
          });
          toast.present();
        }
      });
    }
  }

  loadLoginFields(email: string, clave: string) {
    this.loginFields.email = email;
    this.loginFields.clave = clave;
  }

  login() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Dueño",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("dueno@comanda.com", "1234");
          }
        },
        {
          text: "Supervisor",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("supervisor@comanda.com", "1234");
          }
        },
        {
          text: "Cocinero",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("cocinero@comanda.com", "1234");
          }
        },
        {
          text: "Mozo",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("mozo@comanda.com", "1234");
          }
        },
        {
          text: "Bartender",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("bartender@comanda.com", "1234");
          }
        },
        {
          text: "Delivery",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("delivery@comanda.com", "1234");
          }
        },
        {
          text: "Cliente Registrado",
          icon: "people",
          cssClass: "loginProfileButton",
          handler: () => {
            this.loadLoginFields("clienteregistrado@comanda.com", "1234");
          }
        }
      ]
    });
    actionSheet.present();
  }

  irARegistro() {
    this.navCtrl.push(PagesRegistroUsuarioPage);
  }
}
