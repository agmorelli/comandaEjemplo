import { NgModule } from '@angular/core';
import { MesaDirective } from './mesa/mesa';
import { IonicModule } from 'ionic-angular/module';

@NgModule({
	declarations: [MesaDirective],
	imports: [IonicModule],
	exports: [MesaDirective]
})
export class DirectivesModule {}
