import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { CocineroMenuPage } from './pages-cocinero-menu';
import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  declarations: [
    CocineroMenuPage
  ],
  imports: [
    IonicPageModule.forChild(CocineroMenuPage),
    ComponentsModule
  ]
})
export class CocineroMenuPageModule {}
