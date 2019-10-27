import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { SoundsService } from '../../services/sounds-service';

@IonicPage()
@Component({
  selector: 'page-pages-empleado',
  templateUrl: 'pages-empleado.html',
})
export class PagesEmpleadoPage {

  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public fcm: FcmProvider,
    public toastCtrl: ToastController,
    private soundsService: SoundsService
    ) {
  }

  ionViewDidLoad() {
    
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
     }

    if(this.platform.is('cordova')){
          
      // Get a FCM token
      //fcm.getToken()

      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          
          const toast = this.toastCtrl.create({
            message: msg.body,
            //duration: 5000,
            closeButtonText: 'OK',
            showCloseButton: true,
            position: 'middle',
            cssClass: 'toastPedido'
          });
          toast.present();
        })
      )
      .subscribe()
    }    
  
  
  }

}
