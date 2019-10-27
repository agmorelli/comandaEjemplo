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
  selector: 'alta-empleado',
  templateUrl: 'alta-empleado.html'
})
export class AltaEmpleadoComponent {

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

  tipo = new FormControl('', [
    Validators.required
  ]);


  registroFormEmpleado: FormGroup = this.builder.group({
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    cuil: this.cuil,
    email: this.email,
    clave: this.clave,
    tipo: this.tipo
  });

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

  AltaEmpleado() {

    if (!this.usuarioService.validarUsuarioExiste(this.usuarios, this.registroFormEmpleado.get('nombre').value)) {

      let usuarioEmpleado = new Usuario();

      usuarioEmpleado.nombre = this.registroFormEmpleado.get('nombre').value;
      usuarioEmpleado.apellido = this.registroFormEmpleado.get('apellido').value;
      usuarioEmpleado.dni = this.registroFormEmpleado.get('dni').value;
      usuarioEmpleado.cuil = this.registroFormEmpleado.get('cuil').value;
      usuarioEmpleado.email = this.registroFormEmpleado.get('email').value;
      usuarioEmpleado.clave = this.registroFormEmpleado.get('clave').value;
      usuarioEmpleado.perfil = 'empleado';
      usuarioEmpleado.tipo = this.registroFormEmpleado.get('tipo').value;

      this.objFirebase.collection("SP_usuarios")
        .add({
          'apellido': usuarioEmpleado.apellido,
          'nombre': usuarioEmpleado.nombre,
          'email': usuarioEmpleado.email,
          'clave': usuarioEmpleado.clave,
          'dni': usuarioEmpleado.dni,
          'cuil': usuarioEmpleado.cuil,
          'perfil': usuarioEmpleado.perfil,
          'tipo': usuarioEmpleado.tipo,
          'foto': 'usuarios/' + usuarioEmpleado.dni,
          'timestamp': Date()
        }).then(res => {

          console.log(res);
          let toast = this.toastCtrl.create({
            message: "Registracion Exitosa!",
            duration: 3000,
            position: 'middle' //middle || top
          });
          toast.present();

          this.registroFormEmpleado.reset();

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

    const fotos = storage().ref('usuarios/' + this.registroFormEmpleado.get('dni').value);
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

      this.registroFormEmpleado.controls['nombre'].setValue(split[2]);
      this.registroFormEmpleado.controls['apellido'].setValue(split[1]);
      this.registroFormEmpleado.controls['dni'].setValue(parseInt(split[4]));


    }).catch(err => {
      console.log('Error', err);
    });

  }

}
