import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { UsuarioService } from '../../services/usuario-service';
import { spin } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-pages-registro-usuario',
  templateUrl: 'pages-registro-usuario.html',
})
export class PagesRegistroUsuarioPage {

  botonHabilitado:boolean = true;
  usuarios: Array<Usuario>;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    private camera: Camera,
    private objFirebase: AngularFirestore,
    private barcodeScanner: BarcodeScanner,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController
  ) {
    this.usuarioService.traerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

  nombre = new FormControl('', [
    Validators.required
  ]);
  apellido = new FormControl('', [
    Validators.required
  ]);

  dni = new FormControl('', [
    Validators.required,
    Validators.minLength(7)
  ]);

  email = new FormControl('', [
    Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])

  ]);

  clave = new FormControl('', [
    Validators.required
  ]);


  registroForm: FormGroup = this.builder.group({
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    email: this.email,
    clave: this.clave,

  });

 async Registrar() {

    //spin(this.modalCtrl, true);
    if (!this.usuarioService.validarUsuarioExiste(this.usuarios, this.registroForm.get('email').value)) {
      this.botonHabilitado = false;
      spin(this.modalCtrl, true);
      
      let usuario = new Usuario();

      usuario.nombre = this.registroForm.get('nombre').value;
      usuario.apellido = this.registroForm.get('apellido').value;
      usuario.dni = this.registroForm.get('dni').value;
      usuario.email = this.registroForm.get('email').value;
      usuario.clave = this.registroForm.get('clave').value;
      usuario.perfil = "cliente";
      usuario.estado = "Pendiente";
      usuario.tipo = "cliente";
     // usuario.codigoRegistro= Math.random() * (9999 - 1000) + 1000;
      usuario.cuil = null;

      var idUsuario = this.objFirebase.createId();

      this.objFirebase.collection("SP_usuarios").doc(idUsuario)
      .set({
       'id': idUsuario,
       'apellido': usuario.apellido,
       'nombre': usuario.nombre,
       'email': usuario.email,
       'clave': usuario.clave,
       'dni': usuario.dni,
       'cuil': usuario.cuil,
       'estado': usuario.estado,
       'perfil': usuario.perfil,
       'tipo': usuario.tipo,
       'foto': 'clientes/' + usuario.dni
              
      }).then(res => {
              this.registroForm.reset();
              this.botonHabilitado = true;
              spin(this.modalCtrl, false);
              
              console.log(res);
              let toast = this.toastCtrl.create({
                message: "Por favor, verifica tu correo para completar el registro.",
                duration: 3000,
                position: 'middle' //middle || top
              });
              
              toast.present();

             // this.altaReservaForm.reset();

            }, err => {
              console.log(err)
              spin(this.modalCtrl, false);
              this.botonHabilitado = true;
            });

     /* this.objFirebase
        .collection("SP_usuarios")
        .add({
          'apellido': usuario.apellido,
          'nombre': usuario.nombre,
          'email': usuario.email,
          'clave': usuario.clave,
          'dni': usuario.dni,
          'cuil': usuario.cuil,
          'estado': usuario.estado,
          'codigoRegistro': usuario.codigoRegistro,
          'foto': 'clientes/' + usuario.dni
        })
        .then(res => {

          console.log(res);
          let toast = this.toastCtrl.create({
            message: "Registracion exitosa.",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();

        }, err => console.log(err));*/

    }
  }

  async SacarFoto() {

    const options: CameraOptions = {
      quality: 50,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    let hora = new Date();

    const result = await this.camera.getPicture(options);

    const fotos = storage().ref('clientes/' + this.registroForm.get('dni').value);
    const imagen = 'data:image/jpeg;base64,' + result;
    fotos.putString(imagen, 'data_url');


  }

  LeerDni() {

    const opciones: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      //saveHistory: true, // Android, save scan history (default false)
      prompt: "Scanee el DNI", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

    this.barcodeScanner.scan(opciones).then(barcodeData => {
      //console.log('Barcode data', barcodeData);

      var split = barcodeData.text.split("@");
      console.log(split);

      this.registroForm.controls['nombre'].setValue(split[2]);
      this.registroForm.controls['apellido'].setValue(split[1]);
      this.registroForm.controls['dni'].setValue(parseInt(split[4]));

    }).catch(err => {
      console.log('Error', err);
    });

  }

}
