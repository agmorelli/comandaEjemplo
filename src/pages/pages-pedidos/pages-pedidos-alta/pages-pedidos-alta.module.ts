import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesPedidosAltaPage } from './pages-pedidos-alta';

@NgModule({
  declarations: [
    PagesPedidosAltaPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesPedidosAltaPage),
  ],
})
export class PagesPedidosAltaPageModule {}
