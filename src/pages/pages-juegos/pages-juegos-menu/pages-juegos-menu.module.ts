import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesJuegosMenuPage } from './pages-juegos-menu';

@NgModule({
  declarations: [
    PagesJuegosMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesJuegosMenuPage),
  ],
})
export class PagesJuegosMenuPageModule {}
