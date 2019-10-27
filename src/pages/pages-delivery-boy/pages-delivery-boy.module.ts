import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesDeliveryBoyPage } from './pages-delivery-boy';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PagesDeliveryBoyPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesDeliveryBoyPage),
    ComponentsModule
  ],
})
export class PagesDeliveryBoyPageModule {}
