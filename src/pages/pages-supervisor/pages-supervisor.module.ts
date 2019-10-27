import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesSupervisorPage } from './pages-supervisor';

@NgModule({
  declarations: [
    PagesSupervisorPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesSupervisorPage),
  ],
})
export class PagesSupervisorPageModule {}
