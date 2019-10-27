import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'alta-dueno',
  templateUrl: 'alta-dueno.html'
})
export class AltaDuenoComponent {

  usuarios: Array<Usuario>;

  nombre = new FormControl('', [
    Validators.required
  ]);

  apellido = new FormControl('', [
    Validators.required
  ]);

  dni = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(8)

  ]);

  cuil = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(11)
  ]);

  email = new FormControl('', [
    Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])

  ]);

  clave = new FormControl('', [
    Validators.required
  ]);

  perfil = new FormControl('', [
    Validators.required
  ]);

  tipo = new FormControl('', [
    Validators.required
  ]);


  registroForm: FormGroup = this.builder.group({
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    cuil: this.cuil,
    email: this.email,
    clave: this.clave,
    perfil: this.perfil

  });

  validation_messages = {
    'dni': [
      { type: 'minlength', message: 'El dni debe ser minimo de 7 caracteres.' },
      { type: 'maxlength', message: 'El dni debe ser maximo de 8 caracteres.' },
    ],
    'cuil': [
      { type: 'minlength', message: 'El CUIL debe ser minimo de 10 caracteres.' },
      { type: 'maxlength', message: 'El CUIL debe ser maximo de 11 caracteres.' },
    ],

  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    public modalVotacion: ModalController,
    private builder: FormBuilder,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.traerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }

  Volver() {
    this.navCtrl.pop();
  }

  AltaDueno() {

    if (!this.usuarioService.validarUsuarioExiste(this.usuarios, this.registroForm.get('nombre').value)) {
      var usuarioDuenoSupervisor = new Usuario();

      usuarioDuenoSupervisor.nombre = this.registroForm.get('nombre').value;
      usuarioDuenoSupervisor.apellido = this.registroForm.get('apellido').value;
      usuarioDuenoSupervisor.dni = this.registroForm.get('dni').value;
      usuarioDuenoSupervisor.cuil = this.registroForm.get('cuil').value;
      usuarioDuenoSupervisor.email = this.registroForm.get('email').value;
      usuarioDuenoSupervisor.clave = this.registroForm.get('clave').value;
      usuarioDuenoSupervisor.perfil = this.registroForm.get('perfil').value;

      this.objFirebase.collection("SP_usuarios")
        .add({
          'apellido': usuarioDuenoSupervisor.apellido,
          'nombre': usuarioDuenoSupervisor.nombre,
          'email': usuarioDuenoSupervisor.email,
          'clave': usuarioDuenoSupervisor.clave,
          'dni': usuarioDuenoSupervisor.dni,
          'cuil': usuarioDuenoSupervisor.cuil,
          'perfil': usuarioDuenoSupervisor.perfil,
          'foto': 'usuarios/' + usuarioDuenoSupervisor.dni,
          'timestamp': Date()
        }).then(res => {

          console.log(res);
          let toast = this.toastCtrl.create({
            message: "Registracion Exitosa!",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();

          this.registroForm.reset();

        }, err => console.log(err));
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

    const fotos = storage().ref('usuarios/' + this.registroForm.get('dni').value);
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
