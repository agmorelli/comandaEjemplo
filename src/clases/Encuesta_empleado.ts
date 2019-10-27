export class Encuesta_empleado {

    //supervisor: string;
    //cliente: string;
    empleadoId: string;

    estadoPuestoTrabajo: number;
    estadoBanos: number;
    estadoSalon: number;
    //conversacion: number;
    limpiaMesas: any;
    basuraPisos: any;
    timestamp: Date;
    //usaBienBano: any;

    constructor(
        // supervisor?:string,
        // cliente?:string,
        // empleado?:string,

        // coordialidad?:number,
        // puntualidad?:number,
        // responsabilidad?:number,
        // conversacion?:number,
        // limpiaMesa?:any,
        // basuraPiso?:any,
        // usaBienBano?:any
        ){
        //     this.supervisor = supervisor;
        //     this.cliente = cliente;
        //     this.empleado = empleado;

        //     this.coordialidad = coordialidad;
        //     this.puntualidad = puntualidad;
        //     this.responsabilidad = responsabilidad;
        //     this.conversacion = conversacion;
        //         this.limpiaMesa = limpiaMesa;
        //         this.basuraPiso = basuraPiso;
        //         this.usaBienBano = usaBienBano;
    }

    dameJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}
