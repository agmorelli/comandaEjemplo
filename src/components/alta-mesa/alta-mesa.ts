import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mesa } from '../../clases/mesa';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage } from 'firebase';

import { MesasProvider } from '../../providers/mesas/mesas'

@Component({
  selector: 'alta-mesa',
  templateUrl: 'alta-mesa.html'
})
export class AltaMesaComponent {

  proxNumero = this.mesaProvider.mesas.length+1;

  numero = new FormControl(this.proxNumero, [
    Validators.required
  ]);

  cantidadComensales = new FormControl(null, [
    Validators.required
  ]);

  tipoMesa = new FormControl('', [
    Validators.required
  ]);

  altaMesaForm: FormGroup = this.builder.group({

    numero: this.numero,
    cantidadComensales: this.cantidadComensales,
    tipoMesa: this.tipoMesa,

  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private objFirebase: AngularFirestore,
    public modalVotacion: ModalController,
    private builder: FormBuilder,
    private camera: Camera,
    private mesaProvider: MesasProvider
  ) {

  }

  ionViewWillEnter(){
   
  }

  AltaMesa(){
        
    var nuevaMesa= new Mesa();  
    
    nuevaMesa.numero= parseInt(this.altaMesaForm.get('numero').value);
    nuevaMesa.cantidadComensales= parseInt(this.altaMesaForm.get('cantidadComensales').value);
    nuevaMesa.tipoMesa= this.altaMesaForm.get('tipoMesa').value;
    
      
      //this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, nuevaMesa).then((encodedData) => {
  
          //console.log(encodedData);
          //nuevaMesa.codigoQr = encodedData;
          var keyMesa = this.objFirebase.createId();
          

          this.objFirebase.collection("SP_mesas").doc(keyMesa)
          .set({
              'id':keyMesa,   
              'numero': nuevaMesa.numero,
              'cantidadComensales':nuevaMesa.cantidadComensales,
              'tipoMesa': nuevaMesa.tipoMesa,
              'estado':'disponible',
              
                  
          }).then(res => {

                  console.log(res);
                  let toast = this.toastCtrl.create({
                    message: "Alta de Mesa correcta!",
                    duration: 3000,
                    position: 'middle' //middle || top
                  });
                  toast.present();

                  this.altaMesaForm.reset();
                  
                  
                  this.numero = new FormControl(this.proxNumero+1, [
                    Validators.required
                  ]);

                  this.mesaProvider.mesas.length = this.proxNumero;
                  
                  
                  

                }, err => console.log(err));

    //  }, (err) => {
    //      console.log("Error occured : " + err);
    //  });                 
     
    
  }

  Volver() {
    this.navCtrl.pop();
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

    const fotos = storage().ref('mesas/' + this.altaMesaForm.get('numero').value);
    const imagen = 'data:image/jpeg;base64,' + result;
    fotos.putString(imagen, 'data_url');
  }
}
