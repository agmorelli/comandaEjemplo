import { Usuario } from "./usuario";

export class Mensaje {
    id: string;
    usuario: any;         
    fecha: string;     
    mensaje: string;       

           
    constructor(){
      
    }
  
    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }
  }