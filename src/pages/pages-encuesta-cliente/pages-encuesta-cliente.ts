import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EncuestaCliente } from '../../clases/Encuesta_cliente';
import { EncuestaService } from '../../services/encuesta-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

/**
 * Generated class for the PagesEncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-encuesta-cliente',
  templateUrl: 'pages-encuesta-cliente.html',
})
export class PagesEncuestaClientePage {

  cliente;
  valorMozo;
  valorCocinero;
  valorBartender;
  valorMesa;
  valorRestaurant;
  sugerencia;
  pedido;
  puedeSacarFoto: boolean;
  cantFotos: number;
  
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private encuestaServ: EncuestaService,
    private camera: Camera
    
    ) {
    this.cliente=sessionStorage.getItem("usuario");
    this.pedido= this.navParams.get("pedido");
    this.cantFotos=1;
    this.puedeSacarFoto=true;
  }

  Guardar()
  {
  let encuesta= new EncuestaCliente(); 
  encuesta.cliente=this.cliente;
  encuesta.pedido=this.pedido;
  encuesta.sugerencia=this.sugerencia;
  encuesta.valorMozo=this.valorMozo;
  encuesta.valorCocinero=this.valorCocinero;
  encuesta.valorBartender=this.valorBartender;
  encuesta.valorResturant=this.valorRestaurant;
  encuesta.valorMesa=this.valorMesa;

let encuestaJs=encuesta.dameJSON();
  this.encuestaServ.cargarEncuestaCliente(encuestaJs);

  this.VaciarInputs();
  }

  VaciarInputs()
  {
   
    this.valorMozo=0;
    this.valorCocinero=0;
    this.valorBartender=0;
    this.valorMesa="malo";
    this.valorRestaurant=0
    this.sugerencia="";
    
    
    
  }


  async SacarFoto() {

    if(this.cantFotos!=4)
    {

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
  
      const fotos = storage().ref('fotos_encuesta_cliente/' + this.pedido.id + this.cantFotos);
      const imagen = 'data:image/jpeg;base64,' + result;
      fotos.putString(imagen, 'data_url');
      this.cantFotos ++;

      if(this.cantFotos==4)
      {
        this.puedeSacarFoto==false;
      }

    }


    
    



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesEncuestaClientePage');
  }

}
