import { Component, Input } from '@angular/core';
import { Pedido } from '../../clases/Pedido';
import { PedidoService } from '../../services/pedidos-service';
import { LoadingController } from 'ionic-angular'
import { QRService } from '../../services/QR-service';


/**
 * Generated class for the EstadoPedidoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'estado-pedido',
  templateUrl: 'estado-pedido.html'
})
export class EstadoPedidoComponent {
  @Input() pedido: Pedido;
  
 

  constructor(
    private pedidoService: PedidoService,
    private loadingController:LoadingController,
    private qrService: QRService,
  ) {
    console.log('Hello EstadoPedidoComponent Component');
   
  }


  ConfirmarEntrega(){
    //this.pedido.productos[index].estado = estado;
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
    
    loading.present();
    
    this.pedidoService.actualizarUnPedido(this.pedido.id).update({
    
      'estado':'recibido'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });


  }

  IndicarPropina(){
    this.qrService.readQR().then(QRdata => {
      
      let gradoSafisfaccion:number;
      // 27) Que establezca el nivel de satisfacción del cliente, estableciendo el porcentaje de propina a la cuenta: (Antes de marcarse como pagado el pedido, distintos QR)									
      // Excelente -> 20%								
      // Muy Bien -> 15%								
      // Bien -> 10%								
      // Regular -> 5%								
      // Malo -> 0%								
      
      switch(QRdata.text){
        case 'Excelente':
          gradoSafisfaccion = 0.20
          break;
        
        case 'Muy Bien':
          gradoSafisfaccion = 0.15
          break;
        
        case 'Bien':
            gradoSafisfaccion = 0.10
            break;
        
        case 'Regular':
          gradoSafisfaccion = 0.5
          break;

        case 'Malo':
            gradoSafisfaccion = 0
            break;
      }
      
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

      loading.present();

      this.pedidoService.actualizarUnPedido(this.pedido.id).update({
    
        'propina': Math.round((this.pedido.costo * gradoSafisfaccion)*100)/100
      
      }).then(() => {
        loading.dismiss();
        console.log('Documento editado exitósamente');
      
      }).catch(err =>{
        loading.dismiss();
        let loadingError = this.loadingController.create({
          spinner: 'hide',
          content: 'Ocurrio un error, por favor intentalo de nuevo',
          duration: 5000
        });
  
        loadingError.present();
  
        
      });
                  
    });

  }

  SolicitarCuenta(){

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

    loading.present();

    this.pedidoService.actualizarUnPedido(this.pedido.id).update({
    
      'estado':'solicita_cuenta'
    
    }).then(() => {
      loading.dismiss();
      console.log('Documento editado exitósamente');
    
    }).catch(err =>{
      loading.dismiss();
      let loadingError = this.loadingController.create({
        spinner: 'hide',
        content: 'Ocurrio un error, por favor intentalo de nuevo',
        duration: 5000
      });

      loadingError.present();

      
    });

  }


}
