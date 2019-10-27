import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesPedidosListaPage } from './pages-pedidos-lista';

@NgModule({
  declarations: [
    PagesPedidosListaPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesPedidosListaPage),
  ],
})
export class PagesPedidosListaPageModule {}
