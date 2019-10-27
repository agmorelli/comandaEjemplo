import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UsuarioService } from '../../../services/usuario-service';
import { QRService } from '../../../services/QR-service';
import { showAlert, spin } from '../../../environments/environment';
import { SoundsService } from '../../../services/sounds-service';

@IonicPage()
@Component({
  selector: 'lista-de-espera-page-menu',
  templateUrl: 'pages-lista-de-espera-menu.html',
})
export class ListaDeEsperaMenuPage {

  registros:Array<any>;
  usuario;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public modalController: ModalController,
    public navParams: NavParams, 
    public usuarioService: UsuarioService,
    private qrService: QRService,
    private soundsService: SoundsService) {
      this.usuario=JSON.parse(sessionStorage.getItem("usuario"));
    this.registros = new Array<any>();
    this.cargarLista();
  }

  agregarse(){

    if(
      this.registros.filter(function(registro){
        return registro.nombre === JSON.parse(sessionStorage.getItem("usuario")).nombre
      }).length === 1
    ) {
      showAlert(this.alertCtrl,"Error","Ya existe un usuario con su nombre en la lista de espera", this.soundsService, 'error');
      return false;
    }

    this.qrService.readQR().then(barcodeData => {
      try{
        var data = JSON.parse(barcodeData.text);
        if (
          typeof(data.listaDeEspera) !== 'undefined' &&
          data.listaDeEspera === true
        ){

          let registro:any = {
            nombre: JSON.parse(sessionStorage.getItem("usuario")).nombre,
            fecha: Date.now()
          };

          spin(this.modalController, true);

          this.usuarioService.cargarRegistroListaDeEspera(JSON.parse(JSON.stringify(registro))).then(() => {
            spin(this.modalController, false);
            showAlert(this.alertCtrl,"Exito","Agregado a la lista de espera exitosamente", this.soundsService, 'success');
          })
          .catch( error => {
            console.log(error);
            spin(this.modalController, false);
          });
        }
      } catch(err) {
        showAlert(this.alertCtrl, "Error", "QR invalido", this.soundsService, 'error');
      }
    }).catch(err => {
       console.log('Error', err);
   });
  }

  cargarLista(){
    this.usuarioService.traerListaDeEspera().subscribe(arr => {
      console.log(arr);
      this.registros = arr.map(function(registro, index){
        return {
          nombre: JSON.parse(JSON.stringify(registro)).nombre,
          fecha: JSON.parse(JSON.stringify(registro)).fecha,
          indice: index + 1
        }
      });
    });;
  }

}