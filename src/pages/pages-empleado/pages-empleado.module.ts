import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesEmpleadoPage } from './pages-empleado';

@NgModule({
  declarations: [
    PagesEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesEmpleadoPage),
  ],
})
export class PagesEmpleadoPageModule {}
