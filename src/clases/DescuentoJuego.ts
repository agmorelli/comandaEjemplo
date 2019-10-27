export class DescuentoJuego {

  primerValor: Number;
  calculo: string;
  segundoValor: Number;
  resultado: Number;

  constructor() { }

  inicializarValores() {
    switch (Math.floor((Math.random() * 5) + 1)) {
      case 1:
        this.primerValor = 10;
        this.calculo = "+";
        this.segundoValor = 10;
        this.resultado = 20;
        break;
      case 2:
        this.primerValor = 5;
        this.calculo = "x";
        this.segundoValor = 8;
        this.resultado = 40;
        break;
      case 3:
        this.primerValor = 49;
        this.calculo = "-";
        this.segundoValor = 15;
        this.resultado = 34;
        break;
      case 4:
        this.primerValor = 49;
        this.calculo = "/";
        this.segundoValor = 7;
        this.resultado = 7;
        break;
      case 5:
        this.primerValor = 23;
        this.calculo = "+";
        this.segundoValor = 48;
        this.resultado = 71;
        break;
    }
  }

}
