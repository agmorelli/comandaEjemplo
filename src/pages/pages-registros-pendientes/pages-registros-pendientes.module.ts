import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesRegistrosPendientesPage } from './pages-registros-pendientes';

@NgModule({
  declarations: [
    PagesRegistrosPendientesPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesRegistrosPendientesPage),
  ],
})
export class PagesRegistrosPendientesPageModule {}
