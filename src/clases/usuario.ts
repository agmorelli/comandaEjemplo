export class Usuario {

  //MODELO USUARIO DE COMANDA
  id: string;      // id - key de FireBase
  perfil: string;     // Valores = ["supervisor","empleado","cliente","dueño"]	
  tipo: string;       // Valores = ["mozo","cocinero","bar tender","registrado","anonimo",""]	
  email: string;      
  nombre: string;      
  clave: string;      
  apellido: string;
  dni: number;
  cuil: number;
  estado: string;
  codigoRegistro: number;
  foto: string;       // ruta de la foto
  
  
  constructor(){
    
  }

  dameJSON() {
    return JSON.parse( JSON.stringify(this));
  }
}
