import {Usuario} from '../clases/usuario';

export class Pedido {

    id: string; //<-- Damian: id debe ser string.
    productos: Array<any>;
    mesaId: string;
    cliente: Usuario;
    estado: string; //Estados: 
                        // -Restaurant {"solicitado", "pendiente" || "cancelado","proceso","terminado","entregado","recibido","solicita_cuenta", "pagado"}
                        // -Delivery   {"solicitado","pendiente || "cancelado","proceso","terminado","en_camino","entregado","recibido","pagado"} 
                        
    costo: number;
    descuento_10: boolean;
    descuento_bebida: boolean;
    descuento_postre: boolean;
    propina: number;
    tiempo_espera: number;
    mesa: number;
    tipo: string;
    direccion: string;
    costo_envio: number;
    tiempo_envio: number;

    constructor(
        id?:string,
        productos?:Array<any>,
        mesaId?: string,
        cliente?: Usuario,
        estado?: string,
        costo?: number,
        descuento_10?: boolean,
        descuento_bebida?: boolean,
        descuento_postre?: boolean,
        propina?: number,
        tiempo_espera?: number,
        mesa?: number,
        tipo?: string,
        direccion?: string,
        costo_envio?: number,
        tiempo_envio?: number){
            if(id == null || id == undefined) this.id = ""; else this.id = id;
            if(productos == null || productos == undefined) this.productos = new Array<any>(); else this.productos = productos;
            if(mesaId == null || mesaId == undefined) this.mesaId = ""; else this.mesaId = mesaId;
            if(cliente == null || cliente == undefined) this.cliente = new Usuario() ; else this.cliente = cliente;
            if(estado == null || estado == undefined) this.estado = ""; else this.estado = estado;
            if(costo == null || costo == undefined) this.costo = 0; else this.costo = costo;
            if(descuento_10 == null || descuento_10 == undefined) this.descuento_10 = false; else this.descuento_10 = descuento_10;
            if(descuento_bebida == null || descuento_bebida == undefined) this.descuento_bebida = false; else this.descuento_bebida = descuento_bebida;
            if(descuento_postre == null || descuento_postre == undefined) this.descuento_postre = false; else this.descuento_postre = descuento_postre;
            if(propina == null || propina == undefined) this.propina = 0; else this.propina = propina;
            if(tiempo_espera == null || tiempo_espera == undefined) this.tiempo_espera = 0; else this.tiempo_espera = tiempo_espera;
            if(mesa == null || mesa == undefined) this.mesa = 0; else this.mesa = mesa;
            if(tipo == null || tipo == undefined) this.tipo = ""; else this.tipo = tipo;
            if(direccion == null || direccion == undefined) this.direccion = ""; else this.direccion = direccion;
            if(costo_envio == null || costo_envio == undefined) this.costo_envio = 0; else this.costo_envio = costo_envio;
            if(tiempo_envio == null || tiempo_envio == undefined) this.tiempo_envio = 0; else this.tiempo_envio = tiempo_envio;
    }

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
