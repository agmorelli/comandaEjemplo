import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { DescuentoJuego } from '../../../clases/DescuentoJuego';
import { showAlert, round, spin } from '../../../environments/environment';
import { PedidoService } from '../../../services/pedidos-service';
import { Pedido } from '../../../clases/Pedido';
import { SoundsService } from '../../../services/sounds-service';



@IonicPage()
@Component({
  selector: 'pages-juegos-menu',
  templateUrl: 'pages-juegos-menu.html',
})
export class PagesJuegosMenuPage {

  pedido: Pedido;

  //Juego descuento
  juegoDescuendoMostrado: boolean = false;
  descuentoJugado: boolean = false;
  descuentoJuego: DescuentoJuego;
  resultado: Number;

  juegaPorDescuento: boolean;

  //Juego Ahorcado
  juegoAhorcadoMostrado: boolean = false;

  // Definimos las variables
  letra: string = '';
  nombres: any = ['COCHE', 'CASA', 'SAPO', 'PERRO'];
  nombreSecreto: any = this.palabraAleatoria(0, (this.nombres.length - 1));
  palabra: any = '';
  muestraHuecos: any = this.muestraHuecosPalabra();
  mensaje: string = '';
  letras_utilizadas: string = '';
  nombresecretomostrar: string = '';

  vidas: number = 6;
  puntos: number = 0;
  ganador: number = 0;
  imagen: number = 1;

  durationMessages: number = 3000;

  // Creamos un array para guardar las letras que se van seleccionando.
  controlLetras = new Array;


  constructor(public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private pedidoService: PedidoService,
    public modalController: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public soundsService: SoundsService
  ) {

  }

  ionViewDidEnter() {

    this.pedido = this.navParams.get("pedido");
    this.descuentoJuego = new DescuentoJuego();

    if (this.pedido !== undefined) {

      if (this.pedido.cliente.estado === 'Registrado' &&
        this.pedido.descuento_10 == false &&
        this.pedido.descuento_bebida == false &&
        this.pedido.descuento_postre == false
      ) {
        this.juegaPorDescuento = true;
      } else {
        this.juegaPorDescuento = false;
      }
    }
  }

  juegoDescuento() {

    this.juegoDescuendoMostrado = true;
    this.resultado = 0;
    this.descuentoJuego.inicializarValores();

  }

  verificarResultado() {
    if (this.resultado === undefined || this.resultado.toString() === "") {
      showAlert(this.alertController, "Error", "Debe ingresar un valor en el resultado primero!", this.soundsService, 'error')
    } else {
      if (round(Number(this.resultado), 0) === this.descuentoJuego.resultado) {



        if (this.juegaPorDescuento) {
          showAlert(this.alertController, "Felicidades", "Gano un descuento!", this.soundsService, 'success')

          this.pedido.descuento_10 = true;

          this.pedidoService.actualizarUnPedido(this.pedido.id).update(this.pedido).then(() => {
            this.navCtrl.pop();
          })
        } else {
          showAlert(this.alertController, "Felicidades", "Acerto el resultado!", this.soundsService, 'success')
        }

        this.juegoDescuendoMostrado = false;
      } else {
        showAlert(this.alertController, "Lastima", "Vuelva a intentarlo", this.soundsService, 'lose')
      }
    }
  }

  bebida() {




  }

  Ahorcado() {
    this.juegoAhorcadoMostrado = true;
  }

  public compruebaLetra() {
    // Formateamos a mayúsculas para mejorar la legibilidad.
    let letraMayusculas = this.letra.toUpperCase();

    // Si se ha seleccionado una letra...		
    if (letraMayusculas) {

      if (this.controlLetras.indexOf(letraMayusculas) == -1) {

        // Recorremos las letras de la palabra (array), para detectar si la letra se encuentra en ella.
        if (this.nombreSecreto.indexOf(letraMayusculas) != -1) {

          let nombreSecretoModificado = this.nombreSecreto;
          let posicion = new Array;
          let posicionTotal = 0;

          let contador = 1;

          while (nombreSecretoModificado.indexOf(letraMayusculas) != -1) {

            posicion[contador] = nombreSecretoModificado.indexOf(letraMayusculas);
            nombreSecretoModificado = nombreSecretoModificado.substring(nombreSecretoModificado.indexOf(letraMayusculas) + letraMayusculas.length, nombreSecretoModificado.length);

            // Calculamos la posición total.
            if (contador > 1) {
              posicionTotal = posicionTotal + posicion[contador] + 1;
            } else {
              posicionTotal = posicionTotal + posicion[contador];
            }

            // Preparamos la palabra para que sea mostrara en modal de solución directa.
            this.palabra[posicionTotal] = letraMayusculas;

            // Sumamos puntos
            if (this.controlLetras.indexOf(letraMayusculas) == -1) {
              this.puntos = this.puntos + 10;

              // Hacemos uso de Toast Controller para lanzar mensajes flash.
              let toast = this.toastCtrl.create({
                message: 'Genial, la letra ' + letraMayusculas + ' está en la palabra secreta.',
                duration: this.durationMessages,
                cssClass: 'toast-success',
                position: 'top'
              });
              toast.present();
            }

            contador++;

            // Si ya no quedan huecos, mostramos el mensaje para el ganador.
            if (this.palabra.indexOf('_') == -1) {

              // Sumamos puntos
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos + 50;
              }

              // Damos el juego por finalizado, el jugador gana.
              this.finDelJuego('gana')
            }
          }
        }
        else {
          // Restamos una vida.
          this.nuevoFallo();
          // Actualizamos la imagen
          this.nuevaImagen(this.imagen);

          // Comprobamos si nos queda alguna vida.
          if (this.vidas > 0) {

            // Restamos puntos siempre y cuando no sean 0.
            if (this.puntos > 0) {
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos - 5;
              }
            }

            // Mostramos un mensaje indicando el fallo.	
            let toast = this.toastCtrl.create({
              message: 'Fallo, la letra ' + letraMayusculas + ' no está en la palabra secreta. Recuerda que te quedan ' + this.vidas + ' vidas.',
              duration: this.durationMessages,
              cssClass: 'toast-danger',
              position: 'top'
            });
            toast.present();
          }
          else {
            // Damos el juego por finalizado, el jugador pierde.
            this.finDelJuego('pierde')
          }
        }

        // Array de letras utilizadas para mostrar al jugador.
        if (this.letras_utilizadas == '') {
          this.letras_utilizadas += letraMayusculas;
        }
        else {
          this.letras_utilizadas += ' - ' + letraMayusculas;
        }

        // Añadimos al array de letras la nueva letra seleccionada.
        this.controlLetras.push(letraMayusculas);
      }
      else {
        // En caso de que la letra ya hubiera sido seleccionada, mostramos un mensaje.
        let toast = this.toastCtrl.create({
          message: 'La letra ' + letraMayusculas + ' fue seleccionada anteriormente. Por favor, seleccione una letra diferente.',
          duration: this.durationMessages,
          cssClass: 'toast-warning',
          position: 'top'
        });
        toast.present();
      }

    }
  }

  public muestraHuecosPalabra() {
    let totalHuecos = this.nombreSecreto.length;

    // Declaramos la variable huecos como nuevo array.		
    let huecos = new Array;
    for (let i = 0; i < totalHuecos; i++) {
      //Asignamos tantos huecos como letras tenga la palabra.
      huecos.push('_');
    }

    // Para empezar formamos la variable palabra tan solo con los huecos, ya que en este momento aún no se ha seleccionado ninguna letra.	
    this.palabra = huecos;
    return this.palabra;
  }

  // Método que genera una palabra aleatoria comprendida en el array nombres.	
  public palabraAleatoria(primer, ultimo) {
    let numberOfName = Math.round(Math.random() * (ultimo - primer) + (primer));
    return this.nombres[numberOfName];
  }

  public nuevoFallo() {
    this.vidas = this.vidas - 1;
    return this.vidas;
  }

  public nuevaImagen(imagen) {
    this.imagen = imagen + 1;
    return this.imagen;
  }

  public confirmarResolver() {
    this.showPrompt();
  }

  public showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Solución directa',
      message: "¿Está seguro de resolver la palabra secreta directamente?",
      inputs: [
        {
          name: 'palabraSolucion',
          id: 'palabraSolucion',
          placeholder: this.palabra
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            // Se cierra ventana.
          }
        },
        {
          text: 'Resolver',
          handler: data => {
            // Llamamos a método que compara la palabra secreta con la insertada mediante teclado.
            // var solucion = this.palabra.toString();
            // var solucion = solucion.replace(/,/g, '');
            var solucion = ((document.getElementById("palabraSolucion") as HTMLInputElement).value);
            this.resolver(solucion);
          }
        }]
    });
    prompt.present();
  }

  public showConfirm(accion) {

    // Resolver
    if (accion == 'resolver') {
      const confirm = this.alertCtrl.create({
        title: 'Solución directa',
        message: '¿Está seguro de resolver la palabra secreta directamente?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              //
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              //
            }
          }]
      });
      confirm.present();
    }

  }

  public resolver(solucion) {
    // Comprobamos la solución directa.

    if (this.nombreSecreto == solucion.toUpperCase()) {
      var totalOcultas = 0;
      // Recorremos el array para detectar huecos sin transformar a letras.
      for (var i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] == '_') {
          totalOcultas = totalOcultas + 1;
        }
      }

      // ACIERTO :: Sumamos +50 y + 20 por cada hueco sin desvelar.
      this.puntos = this.puntos + 50 + (20 * totalOcultas);

      this.finDelJuego('gana')

      // Colocamos la palabra secreta en el
    } else {
      // ERROR :: RESTAMOS 50.
      this.puntos = this.puntos - 25;

      let toast = this.toastCtrl.create({
        message: 'Lo sentimos!, La palabra ' + solucion + ' no es la palabra secreta. Su error le resta 25 puntos.',
        duration: this.durationMessages,
        cssClass: 'toast-danger',
        position: 'top'
      });
      toast.present();
    }


  }

  public finDelJuego(valor) {
    // Perdedor
    if (valor == 'pierde') {

      this.ganador = 0;

      // Mostramos el mensaje como que el juego ha terminado
      let toast = this.toastCtrl.create({
        message: 'Perdiste!, Inténtalo de nuevo. La palabra secreta es ' + this.nombreSecreto,
        duration: this.durationMessages,
        cssClass: 'toast-danger',
        position: 'top'
      });
      toast.present();
    }

    // Ganador
    if (valor == 'gana') {

      this.ganador = 1;

      if (this.juegaPorDescuento) {

        let toast = this.toastCtrl.create({
          message: 'Bien!, Acertaste la palabra secreta. Si pediste una bebida, la descontamos del pedido!',
          duration: this.durationMessages,
          cssClass: 'toast-success',
          position: 'top'
        });
        toast.present();

        spin(this.modalController, true);
        this.pedido.descuento_bebida = true;

        this.pedidoService.actualizarUnPedido(this.pedido.id).update(this.pedido).then(() => {
          spin(this.modalController, false);
          this.navCtrl.pop();
        })
      } else {

        let toast = this.toastCtrl.create({
          message: 'Bien!, Acertaste la palabra secreta.',
          duration: this.durationMessages,
          cssClass: 'toast-success',
          position: 'top'
        });
        toast.present();
      }

      this.juegoAhorcadoMostrado = false;




    }
  }

  public reiniciaJuego() {
    this.letra = '';
    this.palabra = '';
    this.vidas = 6;
    this.mensaje = '';
    this.ganador = 0;
    this.puntos = 0;
    this.nombreSecreto = this.palabraAleatoria(0, (this.nombres.length - 1));
    this.muestraHuecos = this.muestraHuecosPalabra();
    this.imagen = 1;
    this.letras_utilizadas = '';
    this.nombresecretomostrar = '';
    this.controlLetras = new Array;
  }






}
