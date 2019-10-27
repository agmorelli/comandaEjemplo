import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController, ModalController } from 'ionic-angular';
import { Usuario } from '../../clases/usuario';
import { EncuestaService } from '../../services/encuesta-service';
import { Encuesta_empleado } from '../../clases/Encuesta_empleado';
import { showAlert, spin, getRandomColor, round } from '../../environments/environment';
import { Chart } from 'chart.js';
import { SoundsService } from '../../services/sounds-service';
import { BartenderMenuPage } from "../pages-bartender/pages-bartender-menu/pages-bartender-menu";
import { CocineroMenuPage } from "../pages-cocinero/pages-cocinero-menu/pages-cocinero-menu";

import { PagesMozoPage } from "../pages-mozo/pages-mozo";
import { PagesDeliveryBoyPage } from "../pages-delivery-boy/pages-delivery-boy";
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the PagesEncuestaIngresoEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pages-encuesta-ingreso-empleado',
  templateUrl: 'pages-encuesta-ingreso-empleado.html',
})
export class PagesEncuestaIngresoEmpleadoPage {

  usuario: Usuario;
  encuestas: Encuesta_empleado[];

  encuestaACargar: Encuesta_empleado;

  encuestasCargadasUsuario: boolean = false;
  encuestaMostrada: boolean = false;

  graficoMostrado: boolean = false;

  dia: string;

  subscriber: Subscription;
  @ViewChild(Navbar) navBar: Navbar;

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public encuestaService: EncuestaService,
    public modalController: ModalController,
    public soundsService: SoundsService
  ) {
    //this.usuario = JSON.parse(navParams.get("usuario"));
    this.usuario = navParams.get("usuario");
     
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    this.dia = dd + '/' + mm + '/' + yyyy;

    this.inicializarEncuesta();
    this.cargarEncuestas();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.soundsService.sound('logout');
      if(this.subscriber !== undefined || this.subscriber !== null){
        this.subscriber.unsubscribe();
      }
      this.navCtrl.pop();
    }
  }


  inicializarEncuesta() {
    this.encuestaACargar = new Encuesta_empleado();
    //this.encuestaACargar.coordialidad = 1;
  }

  cargarEncuestas() {
    this.subscriber = this.encuestaService.traerEncuestasEmpleados().subscribe(encuestas => {
      this.encuestas = encuestas;
      this.validarEncuestaCargada();
    })
  }

  
  validarEncuestaCargada() {
    /*
    let encuestasFiltradaEmpleado: Encuesta_supervisor[] = new Array<Encuesta_supervisor>();
    let encuestasFiltradaCliente: Encuesta_supervisor[] = new Array<Encuesta_supervisor>();

    if (this.usuario.perfil === "empleado") {

      //Filtro las encuestas, y solo me quedo con las del empleado actual
      encuestasFiltradaEmpleado = this.encuestas.filter(encuesta => {
        return encuesta.empleado === this.usuario.nombre;
      })

      //Valido si hay al menos una encuesta cargada con el usuario actual, para activar o no el boton del grafico
      if (encuestasFiltradaEmpleado.length > 0) {
        this.encuestasCargadasUsuario = true;
      };

    } else if (this.usuario.perfil === "cliente") {

      //Filtro las encuestas, y solo me quedo con las del cliente actual
      encuestasFiltradaCliente = this.encuestas.filter(encuesta => {
        return encuesta.cliente === this.usuario.nombre;
      })

      //Valido si hay al menos una encuesta cargada con el usuario actual, para activar o no el boton del grafico
      if (encuestasFiltradaCliente.length > 0) {
        this.encuestasCargadasUsuario = true;
      };

    }
    */
  }
  
  cargarGrafico() {

    let encuestasAGraficar: Array<Encuesta_empleado>;
  /*
    if (this.usuario.perfil === "empleado") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.empleado === this.usuario.nombre;
      });
    } else if (this.usuario.perfil === "cliente") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.cliente === this.usuario.nombre;
      });
    }
  */
    //encuestasAGraficar = this.cargarMockData(encuestasAGraficar); //Comentar para testear

    var graphLabels = ["coordialidad", "puntualidad", "responsabilidad", "conversacion", "basuraPiso", "usaBienBano", "limpiaMesa"];
    var data = [];
    var colors = [];

    //Por cada atributo, saco los numeros de todas las encuestas, y de la suma de todos esos numeros, saco el promedio.
    //Si el atributo es basuraPiso/usaBienBaño/limpiaMesa, que son checkbox, solamente los sumo, no saco el promedio
    if (encuestasAGraficar.length !== 0) {
      graphLabels.forEach(function (label) {
        if (label === "basuraPiso" || label === "usaBienBano" || label === "limpiaMesa") {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })), 2))
        } else {
          data.push(round((encuestasAGraficar.map(encuesta => { return encuesta[label] }).reduce(function (total, sum) { return total + sum })) / encuestasAGraficar.length, 2))
        }
        colors.push(getRandomColor());
      });
    }
    graphLabels[graphLabels.indexOf("basuraPiso")] = "Limpia basura del piso";
    graphLabels[graphLabels.indexOf("usaBienBano")] = "Usa limpiamente el baño";
    graphLabels[graphLabels.indexOf("limpiaMesa")] = "Limpia la mesa";
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

  // mostrarEncuesta() {
  //   if (this.encuestaMostrada)
  //     this.encuestaMostrada = false;
  //   else
  //     this.encuestaMostrada = true;
  // }

  cargar() {
    
  
      this.encuestaACargar.empleadoId = this.usuario.id;
      //this.encuestaACargar.cliente = null;
    
      //this.encuestaACargar.cliente = this.usuario.nombre;
      //this.encuestaACargar.empleado = null;
    
    //this.encuestaACargar.supervisor = JSON.parse(sessionStorage.getItem("usuario")).nombre;
    if (this.validarCampos()) {
      this.parsearCampos();
      spin(this.modalController, true);
      
      this.encuestaACargar.timestamp =  new Date();
      
    this.encuestaService.cargarEncuestaEmpleado(this.encuestaACargar.dameJSON()).then(() => {
        //this.subscriber.unsubscribe();     
        spin(this.modalController, false);
        showAlert(this.alertController, "Exito", "Encuesta dada de alta exitosamente", this.soundsService, 'success');
        this.subscriber.unsubscribe();
        switch(this.usuario.tipo) {
          case "cocinero":
            this.navCtrl.pop().then(()=>{
              this.navCtrl.push(CocineroMenuPage);
            });
            break;

          case "bartender":
            this.navCtrl.pop().then(()=>{
             this.navCtrl.push(BartenderMenuPage);
            });
            break;

          case "mozo":
            this.navCtrl.pop().then(()=>{
              this.navCtrl.push(PagesMozoPage);
            });
            break;
             
          case "delivery":
            this.navCtrl.pop().then(()=>{
              this.navCtrl.push(PagesDeliveryBoyPage);
            });  
            break;
        }
        
      })
        .catch(error => {
          console.log(error);
          spin(this.modalController, false);
        });
    }
    //this.navCtrl.pop();
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

  validarCampos() {
    
    if (this.encuestaACargar.estadoPuestoTrabajo === undefined || this.encuestaACargar.estadoPuestoTrabajo < 1 || this.encuestaACargar.estadoPuestoTrabajo > 5) {
      showAlert(this.alertController, "Error", "El campo estado del puesto de trabajo debe tener un valor entre 1 y 5 inclusive", this.soundsService, 'error');
      return false;
    }
    if (this.encuestaACargar.estadoBanos === undefined) {
      showAlert(this.alertController, "Error", "El campo estado baños es obligatorio", this.soundsService, 'error');
      return false;
    }
    if (this.encuestaACargar.estadoSalon === undefined) {
      showAlert(this.alertController, "Error", "El campo estado salon es obligatorio", this.soundsService, 'error');
      return false;
    }
    
    return true;
  }

  parsearCampos() {
   
    this.encuestaACargar.estadoPuestoTrabajo = parseInt(this.encuestaACargar.estadoPuestoTrabajo.toString());
    this.encuestaACargar.estadoBanos = parseInt(this.encuestaACargar.estadoBanos.toString());
    this.encuestaACargar.estadoSalon = parseInt(this.encuestaACargar.estadoSalon.toString());
    if (this.encuestaACargar.basuraPisos === true) { this.encuestaACargar.basuraPisos = 1 } else { this.encuestaACargar.basuraPisos = 0 }
    
    if (this.encuestaACargar.limpiaMesas === true) { this.encuestaACargar.limpiaMesas = 1 } else { this.encuestaACargar.limpiaMesas = 0 }
    
  }

  cargarMockData(encuestasAGraficar: Array<Encuesta_empleado>) {
    let a: any = new Object();
    a.supervisor = "nombreSupervisor";
    a.cliente = null;
    a.empleado = "nombreMozo";
    a.coordialidad = 3;
    a.puntualidad = 5;
    a.responsabilidad = 2;
    a.conversacion = 5;
    a.basuraPiso = 1;
    a.usaBienBano = 0;
    a.limpiaMesa = 1;

    let b: any = new Object();
    b.supervisor = "nombreSupervisor";
    b.cliente = null;
    b.empleado = "nombreMozo";
    b.coordialidad = 5;
    b.puntualidad = 4;
    b.responsabilidad = 3;
    b.conversacion = 3;
    b.basuraPiso = 1;
    b.usaBienBano = 0;
    b.limpiaMesa = 0;

    encuestasAGraficar.push(a, b);
    return encuestasAGraficar;
  }


}
