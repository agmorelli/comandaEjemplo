import { Usuario } from "./usuario";

export class Mesa {
  id: string;
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;  
  estado: string;   //Estados: {"disponible", "ocupada", "reservada" } 
  usuario: Usuario;
         
  constructor(){
    
  }

  dameJSON() {
    return JSON.parse( JSON.stringify(this));
  }
}
