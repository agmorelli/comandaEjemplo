import { Component, Input } from '@angular/core';
import { Api } from '../../providers';
import { Alert } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { QRService } from '../../services/QR-service'
import { LoadingController } from 'ionic-angular'



@Component({
  selector: 'solicitud-mesa',
  templateUrl: 'solicitud-mesa.html'
})
export class SolicitudMesaComponent {

  @Input() ocupaMesa: boolean;
  @Input() tieneChat: boolean;

  constructor(
    public api: Api,
    public toastCtrl: ToastController,
    private qrService: QRService,
    public loadingController: LoadingController
  ) {
    
   
  }

  SolicitarMesa(){
    let usuario = JSON.parse(sessionStorage.getItem('usuario')); 

    let loading = this.loadingController.create({
      spinner: 'hide',
      content: `
      <ion-content padding>
        <img id="spinner" src="assets/img/spinner.gif"> 
      </ion-content>`,
      duration: 5000
    });
  
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    



    this.qrService.readQR().then( barcodeData => {
      loading.present();
      //"SolicitudMesa"
      if(barcodeData.text == "SolicitudMesa"){
      
        this.api.get(barcodeData.text,usuario).subscribe(
          (response: any) => {
            
            loading.dismiss();
            const toast = this.toastCtrl.create({
              message: "Se ha enviado la solicitud de mesa. En breve nuestro Staff te contactara.",
              //duration: 5000,
              closeButtonText: 'OK',
              showCloseButton: true,
              position: 'middle',
              cssClass: 'toastPedido'
            });
            toast.present();
          
          
          
          }
        );
      }else{
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: "Noup! Creo que te equivocaste de QR, ese no corresponde",
          //duration: 5000,
          closeButtonText: 'OK',
          showCloseButton: true,
          position: 'top',
          cssClass: 'toastPedido'
        });
        toast.present();
      }    




    }).catch(err => {
      const toast = this.toastCtrl.create({
        message: "UPPS! Algo fallo! por favor intentalo de nuevo.",
        //duration: 5000,
        closeButtonText: 'OK',
        showCloseButton: true,
        position: 'bottom',
        cssClass: 'toastPedido'
      });
      toast.present();
      //console.log('Error', err);
  });
    
    
    

    
    
  
  }

}
