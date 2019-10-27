import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesRegistroUsuarioPage } from './pages-registro-usuario';

@NgModule({
  declarations: [
    PagesRegistroUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesRegistroUsuarioPage),
  ],
})
export class PagesRegistroUsuarioPageModule {}
