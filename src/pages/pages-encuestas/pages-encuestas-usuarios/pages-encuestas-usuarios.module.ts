import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEncuestasUsuariosPage } from './pages-encuestas-usuarios';

@NgModule({
  declarations: [
    PagesEncuestasUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEncuestasUsuariosPage),
  ],
})
export class PagesEncuestasUsuariosPageModule {}
