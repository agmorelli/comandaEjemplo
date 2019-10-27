import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesDuenoMenuPage } from './pages-dueno-menu';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PagesDuenoMenuPage,

  ],
  imports: [
    IonicPageModule.forChild(PagesDuenoMenuPage),
    ComponentsModule
  ],
})
export class PagesDuenoMenuPageModule {}
