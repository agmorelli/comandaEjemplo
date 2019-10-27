import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesProductoListaPage } from './pages-producto-lista';

@NgModule({
  declarations: [
    PagesProductoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesProductoListaPage),
  ],
})
export class PagesProductoListaPageModule {}
