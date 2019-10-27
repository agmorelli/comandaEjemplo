import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  splash = true;

  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio) {

    this.nativeAudio.preloadSimple('uniqueId1', 'assets/sounds/2019_TP_PPS_Comanda.mp3').then(function (msg) {}, function (error) {});

  }

  ionViewDidLoad(){

    setTimeout(() => {
      this.splash = false;
      this.nativeAudio.play('uniqueId1');
    },7000)

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
