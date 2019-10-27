import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';

import { Usuario } from '../../clases/usuario';
import { ArchivoPost } from '../../clases/ArchivoPost';
import { PagesModalPage } from "../pages-modal/pages-modal";
import { SpinnerPage } from "../../pages/pages-spinner/pages-spinner";

//Movimiento
import { Shake } from '@ionic-native/shake';
import { DeviceMotion } from '@ionic-native/device-motion';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
/*
  cardItems: Array<any>;
  cardItemsGraph: Array<any>;
  public cameraImage : String
  public imgs: string[];
  nombreSala: string[] = ["Cosas Lindas", "Cosas Feas"];
  public opcion: number;
  private spinner;
  public usuario: Usuario;
  private usuarios: Array<Usuario>;
  private coleccionTipadaFirebase: AngularFirestoreCollection<ArchivoPost>;
  private ListadoCreditosObservable: Observable<ArchivoPost[]>;

  photoData: Array<any>;
  @ViewChild(Content) content: Content;
  xData: any;

  private x = 0;
  contador: number = 0;
  tArray: number = 0;
*/
  constructor (/*
    private alertCtrl: AlertController,
    public storage: Storage,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private platform: Platform,
    private camera: Camera,
    private objFirebase: AngularFirestore,
    public navParams: NavParams,
    private deviceMotion: DeviceMotion,
  private shake: Shake */) {
     /* this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.cardItems = new Array<any>();
      this.cardItemsGraph = new Array<any>();
      this.opcion = navParams.get('opcion');
      this.photoData = new Array<any>();
      this.cargarUsuarios();

      this.xData = 0;

      //Al sacudir, reinica la vista
      this.platform.ready().then(() => {
        this.goWaves();
        this.shake.startWatch().subscribe(() => {
          this.traerArchivoPost();
        })
      })*/
  }
/*
  cargarUsuarios() {
    let coleccionTipadaFirebase = this.objFirebase.collection<Usuario>('users_recursada', ref => ref.orderBy('id','asc'));
    let ListadoUsuariosObservable = coleccionTipadaFirebase.valueChanges();
    let ob = ListadoUsuariosObservable.subscribe(x => {
      console.info("Conexión correcta con Firebase. Trayendo Usuarios: ", x);
      this.usuarios = x;
      ob.unsubscribe();
    });
  }

  Modal(titulo: string, data: any) {
    this.modalCtrl.create(PagesModalPage, { titulo: titulo, data: data }).present();
  }

  Graph(data: any, sala: any) {
    //this.modalCtrl.create(GraphPage, { data: data, sala: sala }).present();
  }
  
  ngOnInit() {
    this.traerArchivoPost();
  }

  cargarPosts(post: ArchivoPost) {

    this.cardItems.push(
      {
        user: {
          avatar: "",
          name: this.usuarios[post.usuario_id-1].nombre
        },
        date: post.fecha,
        image: "",
        profile: this.usuarios[post.usuario_id-1].perfil,
        id: post.usuario_id
      }
    );

    var indexNumber = this.cardItems.length-1;

    this.getImageURL(post.path).then(data => {
      this.cardItems[indexNumber].user.avatar = data.toString();
      this.cardItems[indexNumber].image = data.toString();
    }).catch(er => { console.log('Error:'+ JSON.stringify(er));});
  }
/*
  guardarArchivoPost(): string {
    this.spin(true);
    let ruta: string = this.nombreSala[this.opcion-1]; // environment.firebase.storageBucket
    let nuevo: ArchivoPost;
    nuevo = new ArchivoPost(ruta, this.usuario.id);
    let objetoJsonGenerico = nuevo.dameJSON();
    this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1]).add(objetoJsonGenerico)
    .then(ret => {
      console.log(`id= ${ret.id} ,  path= ${ret.path}`);
      //this.traerArchivoPost();
      this.spin(false);
    })
    .catch( error => {
      this.spin(false);
      console.error(error);
      this.Modal('Error', 'Detalle: '+error);
    });
    return nuevo.path; // devuelvo la ruta completa mientras la llamada asincrónica guarda el valor en la tabla de referencia de indices
  }

  inicializarPorquerias(){
    this.x = 0;
    this.contador= 0;
    this.tArray = 0;
    this.xData = 0;
  }
  
  traerArchivoPost() {

    this.inicializarPorquerias();

    this.spin(true);
    //this.cardItems = new Array<any>();
    this.coleccionTipadaFirebase = this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1], ref => ref.orderBy('fecha', 'desc') );
    this.ListadoCreditosObservable = this.coleccionTipadaFirebase.valueChanges();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    
    this.savePhotoCamera(options);
  }

  addLibraryPhoto () {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    
    this.savePhoto(options);
  }

  savePhotoCamera (options){

    this.camera.getPicture(options).then((imageData) => {

      this.photoData.push(imageData);

      if(this.photoData.length == 3){

        this.photoData.forEach((photo:any) => {
          this.uploadImage(photo, this.guardarArchivoPost());
          this.wait(5000);
        });

        this.photoData = new Array<any>();

      } else if(this.photoData.length < 3){

        let alert = this.alertCtrl.create({
          title: 'Sacar mas fotos',
          message: 'Desea sacar mas fotos? Max: 3',
          cssClass: 'alertConfirm',
          buttons: [
            {
              text: 'No',
              handler: () => {

                this.photoData.forEach((photo:any) => {
                  this.uploadImage(photo, this.guardarArchivoPost());
                  this.wait(5000);
                });

                this.photoData = new Array<any>();

              }
            },
            {
              text: 'Si',
              handler: () => {
                this.takePhoto();
              }
            }
          ]
        });
        alert.present();

      }

    }, (err) => {
      this.Modal('Error', err);
    }).catch((erro) => { 
      this.Modal('Error', erro);
    });

  }

  savePhoto (options) {
      this.camera.getPicture(options).then((imageData) => {
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
        return this.uploadImage(imageData, this.guardarArchivoPost());
      }, (err) => {
        this.Modal('Error', err);
      }).catch((erro) => { 
        this.Modal('Error', erro);
      });
  }

  getBlob (b64Data): any {
    let contentType = '';
    let sliceSize = 512;

    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  uploadImage(image: string, path: string): any {
    this.spin(true);
    let data = this.getBlob(image);
    let storageRef =  firebase.storage().ref();
    let imageRef = storageRef.child(path);
    imageRef.put(data).then(() => {
      console.log('Imagen subida exitosamente: '+path);
      this.spin(false);
      this.Modal('Archivo', 'Imagen subida exitosamente.');
      //this.traerArchivoPost();
    });
    // return imageRef.putString(image, 'data_url');
    // return imageRef.putString(image);
    // return imageRef.putString(image, firebase.storage.StringFormat.DATA_URL);
  }

  traerUsuario(id?: number) {

    this.inicializarPorquerias();
    
    this.spin(true);
    let idd: number;
    if(id !== undefined) idd = id;
    else idd = this.usuario.id;
    this.coleccionTipadaFirebase = this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1], ref => ref.where('usuario_id', '==', idd) );
    this.ListadoCreditosObservable = this.coleccionTipadaFirebase.valueChanges();
  }

  getImageURL(path: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(path);
    return imageRef.getDownloadURL();
  }

  private spin(status: boolean) {
    if(this.spinner === undefined && status === true) {
      this.spinner = this.modalCtrl.create(SpinnerPage);
      this.spinner.present();
    } else if(this.spinner !== undefined && status === false) {
      this.spinner.dismiss();
      this.spinner = undefined;
    }
  }

  votar(item: any){

    this.spin(true);
    let ob = this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1], ref => ref
        .where('fecha', '==', item.date) )
        .ref.get();

    ob.then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        
        if(doc.data().fecha == item.date){

          let nuevo: ArchivoPost = new ArchivoPost(
            this.nombreSala[this.opcion-1], 
            doc.data().usuario_id,
            item.date,
            doc.data().votantes
          );

          //Validacion de si existe ya un voto con el id del usuario
          
          if( nuevo.addVote(this.usuario.id) == -1){

            throw new Error('Su voto ya fue registrado para esta foto!');

          } else {

            this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1])
            .doc(doc.id)
            .update(nuevo.dameJSON());

          }

        }
      
      });

    }).then(() => {
      this.spin(false);
      this.Modal('Información', "Voto registrado con exito!");
    }).catch((error) => {
      this.spin(false);
      this.Modal('Error', "Error registrando el voto: " + error);
    });
    
  }

  mostrarGrafico(){

    this.spin(true);
    //this.cardItems = new Array<any>();
    this.coleccionTipadaFirebase = this.objFirebase.collection<ArchivoPost>(this.nombreSala[this.opcion-1], ref => ref.orderBy('fecha', 'desc') );
    this.ListadoCreditosObservable = this.coleccionTipadaFirebase.valueChanges();

  }

  volver(){
    //this.modalCtrl.create(PagesModalVotacionPage).present();
  }

  wait(ms){
     var start = new Date().getTime();
     var end = start;
     while(end < start + ms) {
       end = new Date().getTime();
    }
  }

  goWaves(){
    var options = { frequency: 1000 };
  }

  //TODO Agregar a movimiento para abajo del celular
  scrollDown(){
    this.content.scrollTo(0, this.xData + 615, 200).then(() => {
      this.xData = this.content.getContentDimensions().scrollTop;
    });
  }

  //TODO Agregar a movimiento para arriba del celular
  scrollUp(){
    if(this.xData!=0){
      this.content.scrollTo(0, this.xData - 615, 200).then(() => {
        this.xData = this.content.getContentDimensions().scrollTop;
      });
    }
  }
*/
}

