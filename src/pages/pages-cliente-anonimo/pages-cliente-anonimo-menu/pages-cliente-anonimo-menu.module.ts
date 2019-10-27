import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClienteAnonimoMenuPage } from './pages-cliente-anonimo-menu';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PagesClienteAnonimoMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesClienteAnonimoMenuPage),
    ComponentsModule
  ],
})
export class PagesClienteAnonimoMenuPageModule {}
