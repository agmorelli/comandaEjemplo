import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaDeEsperaMenuPage } from './pages-lista-de-espera-menu';

@NgModule({
  declarations: [
    ListaDeEsperaMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaDeEsperaMenuPage),
  ],
})
export class ListaDeEsperaMenuPageModule {}
