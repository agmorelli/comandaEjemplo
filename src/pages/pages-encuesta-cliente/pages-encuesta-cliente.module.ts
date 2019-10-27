import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEncuestaClientePage } from './pages-encuesta-cliente';

@NgModule({
  declarations: [
    PagesEncuestaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEncuestaClientePage),
  ],
})
export class PagesEncuestaClientePageModule {}
