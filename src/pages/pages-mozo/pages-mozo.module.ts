import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PagesMozoPage } from './pages-mozo';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PagesMozoPage,
  ],
  imports: [
    IonicModule,
    DirectivesModule,
 
    IonicPageModule.forChild(PagesMozoPage),
  ],
})
export class PagesMozoPageModule {}
