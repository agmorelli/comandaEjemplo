import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoMenuPage } from './pages-producto-menu';

@NgModule({
  declarations: [
    ProductoMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductoMenuPage),
  ],
})
export class ProductoMenuPageModule {}
