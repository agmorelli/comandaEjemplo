import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClienteMenuPage } from './pages-cliente-menu';
import { SolicitudMesaComponent } from '../../../components/solicitud-mesa/solicitud-mesa';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PagesClienteMenuPage,
    //SolicitudMesaComponent
    
  ],
  imports: [
    IonicPageModule.forChild(PagesClienteMenuPage),
    ComponentsModule
    //SolicitudMesaComponent
  
  ],
})
export class PagesClienteMenuPageModule {}
