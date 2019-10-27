
import { Component } from '@angular/core';
//import { IonicPage, ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pages-modal',
  templateUrl: 'pages-modal.html',
})
export class PagesModalPage {
  cuerpo: string = "";
  titulo: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.cuerpo = navParams.get('data');
    this.titulo = navParams.get('titulo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
