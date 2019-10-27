import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEncuestaUsuarioPage } from './pages-encuesta-usuario';

@NgModule({
  declarations: [
    PagesEncuestaUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEncuestaUsuarioPage),
  ],
})
export class PagesEncuestaUsuarioPageModule {}
