import { Component } from '@angular/core';
//import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'pages-spinner',
  templateUrl: 'pages-spinner.html',
})
export class SpinnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpinnerPage');
  }

}
