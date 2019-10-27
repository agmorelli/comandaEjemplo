import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClienteAnonimoPage } from './pages-cliente-anonimo';

@NgModule({
  declarations: [
    PagesClienteAnonimoPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesClienteAnonimoPage),
  ],
})
export class PagesClienteAnonimoPageModule {}
