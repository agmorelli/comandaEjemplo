import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoAltaPage } from './pages-producto-alta';

@NgModule({
  declarations: [
    ProductoAltaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductoAltaPage),
  ],
})
export class ProductoAltaPageModule {}
