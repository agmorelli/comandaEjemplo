

export class Credito {
    usuario_id: number;         // id del usuario que cargó el crédito
    codigo: string;             // código QR leído
    valor: number;              // Hardcodeado?

    constructor(codigo: string) {
        this.codigo = codigo;
        if(this.codigo.indexOf("8c95def646b6127282ed50454b73240300dccabc") != -1) {
            this.valor = 10;
        } else if(this.codigo.indexOf("ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172") != -1) {
            this.valor = 50;
        } else if(this.codigo.indexOf("2786f4877b9091dcad7f35751bfcf5d5ea712b2f") != -1) {
            this.valor = 100;
        } else {
            console.log('No se indentificó el código, se carga el valor por defecto de 1.');
            console.log('Código: '+codigo);
            alert('No se indentificó el código, se carga el valor por defecto de 1.\nCódigo: '+codigo);
            alert("codigo.lenght: "+codigo.length);
            this.valor = 1;
        }
    }
  
    dameJSON() {
        return JSON.parse( JSON.stringify(this));
    }
}
