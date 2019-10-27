import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BartenderMenuPage } from './pages-bartender-menu';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    BartenderMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BartenderMenuPage),
    ComponentsModule
  ],
})
export class BartenderMenuPageModule {}
