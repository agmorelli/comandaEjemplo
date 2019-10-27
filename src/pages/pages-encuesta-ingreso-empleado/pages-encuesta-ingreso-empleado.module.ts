import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEncuestaIngresoEmpleadoPage } from './pages-encuesta-ingreso-empleado';

@NgModule({
  declarations: [
    PagesEncuestaIngresoEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEncuestaIngresoEmpleadoPage),
  ],
})
export class PagesEncuestaIngresoEmpleadoPageModule {}
