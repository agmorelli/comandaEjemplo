import { NgModule } from '@angular/core';

import { AltaMesaComponent } from './alta-mesa/alta-mesa';

import { AltaDuenoComponent } from './alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado';
import { SolicitudMesaComponent } from './solicitud-mesa/solicitud-mesa';
import { IonicModule } from 'ionic-angular'
import { ListapedidosComponent } from './listapedidos/listapedidos';
import { ProductosEnPedidoComponent } from './productos-en-pedido/productos-en-pedido';
import { EstadoPedidoComponent } from './estado-pedido/estado-pedido';
@NgModule({
	declarations: [SolicitudMesaComponent,
    ListapedidosComponent,
    ProductosEnPedidoComponent,
    EstadoPedidoComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
],
	imports: [IonicModule],
	exports: [SolicitudMesaComponent,
    ListapedidosComponent,
    ProductosEnPedidoComponent,
    EstadoPedidoComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
]
})
export class ComponentsModule {}
