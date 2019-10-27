import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Usuario } from '../../../../clases/usuario';
import { EncuestaService } from '../../../../services/encuesta-service';
import { Encuesta_supervisor } from '../../../../clases/encuesta_supervisor';
import { showAlert, spin, getRandomColor, round } from '../../../../environments/environment';
import { Chart } from 'chart.js';
import { SoundsService } from '../../../../services/sounds-service';

@IonicPage()
@Component({
  selector: 'page-pages-encuesta-usuario',
  templateUrl: 'pages-encuesta-usuario.html',
})
export class PagesEncuestaUsuarioPage {

  usuario: Usuario;
  encuestas: Encuesta_supervisor[];

  encuestaACargar: Encuesta_supervisor;

  encuestasCargadasUsuario: boolean = false;
  encuestaMostrada: boolean = false;

  graficoMostrado: boolean = false;

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public encuestaService: EncuestaService,
    public modalController: ModalController,
    public soundsService: SoundsService
  ) {
    this.usuario = JSON.parse(navParams.get("usuario"));
    this.inicializarEncuesta();
    this.cargarEncuestas();
  }

  inicializarEncuesta() {
    this.encuestaACargar = new Encuesta_supervisor();
    this.encuestaACargar.coordialidad = 1;
  }

  cargarEncuestas() {
    this.encuestaService.traerEncuestas().subscribe(encuestas => {
      this.encuestas = encuestas;
      this.validarEncuestaCargada();
    })
  }

  validarEncuestaCargada() {
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

  }

  cargarGrafico() {

    let encuestasAGraficar: Array<Encuesta_supervisor>;

    if (this.usuario.perfil === "empleado") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.empleado === this.usuario.nombre;
      });
    } else if (this.usuario.perfil === "cliente") {
      encuestasAGraficar = this.encuestas.filter(encuesta => {
        return encuesta.cliente === this.usuario.nombre;
      });
    }

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

  mostrarEncuesta() {
    if (this.encuestaMostrada)
      this.encuestaMostrada = false;
    else
      this.encuestaMostrada = true;
  }

  cargar() {
    if (this.usuario.perfil === "empleado") {
      this.encuestaACargar.empleado = this.usuario.nombre;
      this.encuestaACargar.cliente = null;
    } else if (this.usuario.perfil === "cliente") {
      this.encuestaACargar.cliente = this.usuario.nombre;
      this.encuestaACargar.empleado = null;
    }
    this.encuestaACargar.supervisor = JSON.parse(sessionStorage.getItem("usuario")).nombre;
    if (this.validarCampos()) {
      this.parsearCampos();
      spin(this.modalController, true);
      this.encuestaService.cargarEncuesta(this.encuestaACargar.dameJSON()).then(() => {
        spin(this.modalController, false);
        showAlert(this.alertController, "Exito", "Encuesta dada de alta exitosamente", this.soundsService, 'success');
        this.navCtrl.pop();
      })
        .catch(error => {
          console.log(error);
          spin(this.modalController, false);
        });
    }

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
    if (this.encuestaACargar.puntualidad === undefined || this.encuestaACargar.puntualidad < 1 || this.encuestaACargar.puntualidad > 5) {
      showAlert(this.alertController, "Error", "El campo puntualidad debe tener un valor entre 1 y 5 inclusive", this.soundsService, 'error');
      return false;
    }
    if (this.encuestaACargar.responsabilidad === undefined) {
      showAlert(this.alertController, "Error", "El campo responsabilidad es obligatorio", this.soundsService, 'error');
      return false;
    }
    if (this.encuestaACargar.conversacion === undefined) {
      showAlert(this.alertController, "Error", "El campo conversacion es obligatorio", this.soundsService, 'error');
      return false;
    }

    return true;
  }

  parsearCampos() {
    this.encuestaACargar.conversacion = parseInt(this.encuestaACargar.conversacion.toString());
    this.encuestaACargar.puntualidad = parseInt(this.encuestaACargar.puntualidad.toString());
    this.encuestaACargar.responsabilidad = parseInt(this.encuestaACargar.responsabilidad.toString());
    if (this.encuestaACargar.basuraPiso === true) { this.encuestaACargar.basuraPiso = 1 } else { this.encuestaACargar.basuraPiso = 0 }
    if (this.encuestaACargar.usaBienBano === true) { this.encuestaACargar.usaBienBano = 1 } else { this.encuestaACargar.usaBienBano = 0 }
    if (this.encuestaACargar.limpiaMesa === true) { this.encuestaACargar.limpiaMesa = 1 } else { this.encuestaACargar.limpiaMesa = 0 }
  }

  cargarMockData(encuestasAGraficar: Array<Encuesta_supervisor>) {
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
