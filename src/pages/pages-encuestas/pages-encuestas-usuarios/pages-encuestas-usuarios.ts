import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../clases/usuario';
import { PagesEncuestaUsuarioPage } from './pages-encuesta-usuario/pages-encuesta-usuario';

@IonicPage()
@Component({
  selector: 'page-pages-encuestas-usuarios',
  templateUrl: 'pages-encuestas-usuarios.html',
})
export class PagesEncuestasUsuariosPage {

  usuarios: Array<Usuario>;
  perfil: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
      this.perfil = navParams.get("perfil");
      this.filtrarUsuarios();
  }

  filtrarUsuarios() {
    this.usuarios = new Array<Usuario>();
    let parentScope = this;
    this.usuarioService.traerUsuarios().subscribe(users => {
      this.usuarios = users.filter(function (usuario) {
        return usuario.perfil === parentScope.perfil;
      });
    });
  }

  obtenerEncuesta(usuario: Usuario){
    this.navCtrl.push(PagesEncuestaUsuarioPage, {"usuario": JSON.stringify(usuario)});
  }

}
