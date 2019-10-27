export class ArchivoPost {
    usuario_id: number;         // id del usuario de la foto
    fecha: number;              // fecha y hora de la subida
    path: string;               // descripción del voto
    votantes: Array<number>;

    constructor(path: string, id: number, fecha?: number, votantes?: Array<number>) {
        
        if(fecha == null || fecha == undefined)
            this.fecha = Date.now();
        else
            this.fecha = fecha;

        this.usuario_id = id;
        
        this.path = path+'/user_ID_'+id.toString()+'/'+this.fecha.toString()+'.jpg';
        
        if(votantes == null || votantes == undefined)
            this.votantes = Array<number>();
        else
            this.votantes = votantes;
    
    }

    addVote(id_votante: number){

        if(this.votantes.indexOf(id_votante)==-1){
            this.votantes.push(id_votante);
            return 1;
        } 

        return -1;

    }
  
    dameJSON() {
        return JSON.parse( JSON.stringify(this));
    }
}
