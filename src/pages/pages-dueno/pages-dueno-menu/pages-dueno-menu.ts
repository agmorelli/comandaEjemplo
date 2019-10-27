import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController, AlertController, Navbar } from 'ionic-angular';
import { AltaMesaComponent } from '../../../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../../../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../../../components/alta-empleado/alta-empleado';
import { MesasProvider } from '../../../providers/mesas/mesas';
import { PagesReservasPage } from '../../pages-reservas/pages-reservas';
import { PagesRegistrosPendientesPage } from '../../pages-registros-pendientes/pages-registros-pendientes';
import { SoundsService } from '../../../services/sounds-service';
import { Encuesta_empleado } from '../../../clases/Encuesta_empleado';
import { Chart } from 'chart.js';
import { showAlert, spin, getRandomColor, round } from '../../../environments/environment';
import { EncuestaService } from '../../../services/encuesta-service';


@IonicPage()
@Component({
  selector: 'page-pages-dueno-menu',
  templateUrl: 'pages-dueno-menu.html',
})
export class PagesDuenoMenuPage {

  graficoMostrado: boolean = false;
  doughnutChart: any;
  encuestas: Encuesta_empleado[];
  encuestasCargadas: boolean;
  
  @ViewChild('doughnutCanvas') doughnutCanvas;

  @ViewChild(Navbar) navBar: Navbar;

  validation_messages = {
    'dni': [
      { type: 'minlength', message: 'El dni debe ser minimo de 7 caracteres.' },
      { type: 'maxlength', message: 'El dni debe ser maximo de 8 caracteres.' },
    ],
    'cuil': [
      { type: 'minlength', message: 'El CUIL debe ser minimo de 10 caracteres.' },
      { type: 'maxlength', message: 'El CUIL debe ser maximo de 11 caracteres.' },
    ],

  }

  reservasPage= PagesReservasPage;
  registrosPendiente= PagesRegistrosPendientesPage;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalVotacion: ModalController,
    private mesasProvider: MesasProvider,
    public actionSheetController: ActionSheetController,
    private soundsService: SoundsService,
    public encuestaService: EncuestaService,
  ) {
    this.cargarEncuestas();
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
     }
  }

  altas() {
    let actionSheet = this.actionSheetController.create({
      buttons: [{
        text: 'Mesa',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaMesaComponent);
        }
      }, {
        text: 'Dueño',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaDuenoComponent);
        }
      }, {
        text: 'Empleado',
        icon: 'add-circle',
        handler: () => {
          this.navCtrl.push(AltaEmpleadoComponent);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    actionSheet.present();
  }

  
  
  Reservas()
  {
    this.navCtrl.push(this.reservasPage);
  }

  RegistrosUsuarios()
  {
    this.navCtrl.push(this.registrosPendiente);
  }

  mostrarGrafico() {
    if (this.graficoMostrado) {
      this.graficoMostrado = false;
      document.getElementById('grafico').style.display = 'none';
    } else {
      this.graficoMostrado = true;
      document.getElementById('grafico').style.display = 'block';
      this.cargarGrafico();
    }
  }

  cargarGrafico() {

    let encuestasAGraficar: Array<Encuesta_empleado>;

    encuestasAGraficar =  this.encuestas;
    // if (this.usuario.perfil === "empleado") {
    //   encuestasAGraficar = this.encuestas.filter(encuesta => {
    //     return encuesta.empleado === this.usuario.nombre;
    //   });
    // } else if (this.usuario.perfil === "cliente") {
    //   encuestasAGraficar = this.encuestas.filter(encuesta => {
    //     return encuesta.cliente === this.usuario.nombre;
    //   });
    // }

    //encuestasAGraficar = this.cargarMockData(encuestasAGraficar); //Comentar para testear

    var graphLabels = ["estadoPuestoTrabajo", "estadoBanos", "estadoSalon", "basuraPisos",  "limpiaMesas"];
    var data = [];
    var colors = [];

    //Por cada atributo, saco los numeros de todas las encuestas, y de la suma de todos esos numeros, saco el promedio.
    //Si el atributo es basuraPiso/usaBienBaño/limpiaMesa, que son checkbox, solamente los sumo, no saco el promedio
    if (encuestasAGraficar.length !== 0) {
      graphLabels.forEach(function (label) {
        if (label === "basuraPisos" || label === "limpiaMesas") {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })), 2))
        } else {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })) / encuestasAGraficar.length, 2))
        }
        colors.push(getRandomColor());
      });
    }
    graphLabels[graphLabels.indexOf("estadoPuestoTrabajo")] = "Estado del puesto de trabajo";    
    graphLabels[graphLabels.indexOf("estadoBanos")] = "Estado del baño";
    graphLabels[graphLabels.indexOf("estadoSalon")] = "Estado del salon";
    graphLabels[graphLabels.indexOf("basuraPisos")] = "Pisos limpios";  
    graphLabels[graphLabels.indexOf("limpiaMesas")] = "Mesas limpias";
    
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
     
      type: 'doughnut',
      data: {
        labels: graphLabels,
        datasets: [{
          label: '# promedio de calificacion', 
          data: data,
          backgroundColor: colors
        }]
      },
      options: {
        legend: {
          display: true
        }
      }

    });
  }

  cargarEncuestas() {
    this.encuestaService.traerEncuestasEmpleados().subscribe(encuestas => {
      this.encuestas = encuestas;
      this.validarEncuestaCargada();
    })
  }

  validarEncuestaCargada() {
    
      if (this.encuestas.length > 0) {
        this.encuestasCargadas = true;
      };
  }

}





