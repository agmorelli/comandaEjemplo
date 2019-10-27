import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ErrorHandler, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { QRScanner } from '@ionic-native/qr-scanner';
import { NativeAudio } from '@ionic-native/native-audio';
//Movimiento
import { Shake } from '@ionic-native/shake';
import { DeviceMotion } from '@ionic-native/device-motion';
import { EmailComposer } from '@ionic-native/email-composer';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

import { environment } from '../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

//PLUGIN QR DNI
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


//PAGES
import { PagesModalPage } from "../pages/pages-modal/pages-modal";
import { SpinnerPage } from '../pages/pages-spinner/pages-spinner';
import { PagesDuenoMenuPage } from '../pages/pages-dueno/pages-dueno-menu/pages-dueno-menu';
import { PagesSupervisorPage } from '../pages/pages-supervisor/pages-supervisor';
import { PagesEmpleadoPage } from '../pages/pages-empleado/pages-empleado';
import { PagesClienteMenuPage } from '../pages/pages-cliente/pages-cliente-menu/pages-cliente-menu';
import { PagesClienteAnonimoPage } from '../pages/pages-cliente-anonimo/pages-cliente-anonimo';
import { PagesClienteAnonimoMenuPage } from '../pages/pages-cliente-anonimo/pages-cliente-anonimo-menu/pages-cliente-anonimo-menu';
import { PagesRegistroUsuarioPage } from '../pages/pages-registro-usuario/pages-registro-usuario';
import { ListaDeEsperaMenuPage } from '../pages/pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { PagesClienteMenuPageModule } from '../pages/pages-cliente/pages-cliente-menu/pages-cliente-menu.module';
import { PagesClienteAnonimoPageModule } from '../pages/pages-cliente-anonimo/pages-cliente-anonimo.module';
import { PagesClienteAnonimoMenuPageModule } from '../pages/pages-cliente-anonimo/pages-cliente-anonimo-menu/pages-cliente-anonimo-menu.module';
import { PagesDuenoMenuPageModule } from '../pages/pages-dueno/pages-dueno-menu/pages-dueno-menu.module';
import { PagesEmpleadoPageModule } from '../pages/pages-empleado/pages-empleado.module';
import { PagesSupervisorPageModule } from '../pages/pages-supervisor/pages-supervisor.module';
import { PagesRegistroUsuarioPageModule } from '../pages/pages-registro-usuario/pages-registro-usuario.module';
import { CocineroMenuPageModule } from '../pages/pages-cocinero/pages-cocinero-menu/pages-cocinero-menu.module';
import { BartenderMenuPageModule } from '../pages/pages-bartender/pages-bartender-menu/pages-bartender-menu.module';
import { ProductoAltaPageModule } from '../pages/pages-producto/pages-producto-alta/pages-producto-alta.module';
import { PagesReservaPageModule } from '../pages/pages-reserva/pages-reserva.module';
import { ListaDeEsperaMenuPageModule } from '../pages/pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu.module';
import { PagesReservaPage } from '../pages/pages-reserva/pages-reserva';
import { PagesEncuestaUsuarioPage } from '../pages/pages-encuestas/pages-encuestas-usuarios/pages-encuesta-usuario/pages-encuesta-usuario';
import { PagesEncuestasUsuariosPage } from '../pages/pages-encuestas/pages-encuestas-usuarios/pages-encuestas-usuarios';
import { PagesEncuestasUsuariosPageModule } from '../pages/pages-encuestas/pages-encuestas-usuarios/pages-encuestas-usuarios.module';
import { PagesEncuestaUsuarioPageModule } from '../pages/pages-encuestas/pages-encuestas-usuarios/pages-encuesta-usuario/pages-encuesta-usuario.module';


//COMPONENT
import { AltaMesaComponent } from '../components/alta-mesa/alta-mesa';
import { AltaDuenoComponent } from '../components/alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from '../components/alta-empleado/alta-empleado';
import { MesasProvider } from '../providers/mesas/mesas';
import { ReservasProvider } from '../providers/reservas/reservas';
import { SolicitudMesaComponent } from '../components/solicitud-mesa/solicitud-mesa';

//SERVICES
import { ProductoService } from '../services/producto-service';
import { CameraService } from '../services/camera-service';
import { QRService } from '../services/QR-service';
import { UsuarioService } from '../services/usuario-service';
import { PagesReservasPageModule } from '../pages/pages-reservas/pages-reservas.module';
import { PagesReservasPage } from '../pages/pages-reservas/pages-reservas';
import { EncuestaService } from '../services/encuesta-service';
import { PedidoService } from '../services/pedidos-service';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { PagesJuegosMenuPage } from '../pages/pages-juegos/pages-juegos-menu/pages-juegos-menu';
import { PagesJuegosMenuPageModule } from '../pages/pages-juegos/pages-juegos-menu/pages-juegos-menu.module';
import { PagesPedidosAltaPage } from '../pages/pages-pedidos/pages-pedidos-alta/pages-pedidos-alta';
import { PagesPedidosAltaPageModule } from '../pages/pages-pedidos/pages-pedidos-alta/pages-pedidos-alta.module';
import { PagesRegistrosPendientesPageModule } from '../pages/pages-registros-pendientes/pages-registros-pendientes.module';
import { PagesRegistrosPendientesPage } from '../pages/pages-registros-pendientes/pages-registros-pendientes';
import { HttpMailProvider } from '../providers/http-mail/http-mail';
import { PagesMozoPage } from '../pages/pages-mozo/pages-mozo';
import { PagesMozoPageModule } from '../pages/pages-mozo/pages-mozo.module';
import { MesaDirective } from '../directives/mesa/mesa';
import { DirectivesModule } from '../directives/directives.module';
import { PagesMesaPageModule } from '../pages/pages-mesa/pages-mesa.module';
import { PagesMesaPage } from '../pages/pages-mesa/pages-mesa';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { PagesPedidosListaPage } from '../pages/pages-pedidos/pages-pedidos-lista/pages-pedidos-lista';
import { PagesPedidosListaPageModule } from '../pages/pages-pedidos/pages-pedidos-lista/pages-pedidos-lista.module';
import { PagesPedidosPendientesMozoPage } from '../pages/pages-pedidos-pendientes-mozo/pages-pedidos-pendientes-mozo';
import { PagesPedidosPendientesMozoPageModule } from '../pages/pages-pedidos-pendientes-mozo/pages-pedidos-pendientes-mozo.module';
import { PagesPedidosDeliveryPageModule } from '../pages/pages-pedidos/pages-pedidos-delivery/pages-pedidos-delivery.module';
import { PagesPedidosDeliveryPage } from '../pages/pages-pedidos/pages-pedidos-delivery/pages-pedidos-delivery';
import { PagesDeliveryBoyPage } from '../pages/pages-delivery-boy/pages-delivery-boy';
import { PagesDeliveryBoyPageModule } from '../pages/pages-delivery-boy/pages-delivery-boy.module';
import { SoundsService } from '../services/sounds-service';
import { Vibration } from '@ionic-native/vibration';
import { PagesChatPageModule } from '../pages/pages-chat/pages-chat.module';
import { PagesChatPage } from '../pages/pages-chat/pages-chat';
import { MensajesProvider } from '../providers/mensajes/mensajes';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { PagesProductoCargaMasivaPageModule } from '../pages/pages-producto/pages-producto-carga-masiva/pages-producto-carga-masiva.module';
import { PagesProductoCargaMasivaPage } from '../pages/pages-producto/pages-producto-carga-masiva/pages-producto-carga-masiva';
import { FilePath } from '@ionic-native/file-path';
import { PagesProductoListaPage } from '../pages/pages-producto/pages-producto-lista/pages-producto-lista';
import { PagesProductoListaPageModule } from '../pages/pages-producto/pages-producto-lista/pages-producto-lista.module';
import { PagesEncuestaIngresoEmpleadoPageModule } from '../pages/pages-encuesta-ingreso-empleado/pages-encuesta-ingreso-empleado.module';
import { PagesEncuestaIngresoEmpleadoPage } from '../pages/pages-encuesta-ingreso-empleado/pages-encuesta-ingreso-empleado';
import { PagesEncuestaClientePageModule } from '../pages/pages-encuesta-cliente/pages-encuesta-cliente.module';
import { PagesEncuestaClientePage } from '../pages/pages-encuesta-cliente/pages-encuesta-cliente';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    PagesModalPage,
    SpinnerPage,
    AltaMesaComponent,
    AltaDuenoComponent,
    AltaEmpleadoComponent,
    
    //SolicitudMesaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PagesClienteMenuPageModule,
    PagesClienteAnonimoPageModule,
    PagesClienteAnonimoMenuPageModule,
    PagesDuenoMenuPageModule,
    PagesEmpleadoPageModule,
    PagesMozoPageModule,
    PagesSupervisorPageModule,
    PagesRegistroUsuarioPageModule,
    CocineroMenuPageModule,
    BartenderMenuPageModule,
    ProductoAltaPageModule,
    PagesReservaPageModule,
    ListaDeEsperaMenuPageModule,
    PagesEncuestasUsuariosPageModule,
    PagesReservasPageModule,
    PagesEncuestaUsuarioPageModule,
    PagesRegistrosPendientesPageModule,
    PagesJuegosMenuPageModule,
    PagesPedidosAltaPageModule,
    PagesMesaPageModule,
    DirectivesModule,
    PagesRegistrosPendientesPageModule,
    PagesJuegosMenuPageModule,
    PagesPedidosListaPageModule,
    PagesPedidosPendientesMozoPageModule,
    PagesPedidosDeliveryPageModule,
    PagesDeliveryBoyPageModule,
    PagesChatPageModule,
    PagesProductoCargaMasivaPageModule,
    PagesProductoListaPageModule,
    PagesEncuestaIngresoEmpleadoPageModule,
    PagesEncuestaClientePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PagesModalPage,
    SpinnerPage,
    PagesDuenoMenuPage,
    PagesSupervisorPage,
    PagesEmpleadoPage,
    PagesMozoPage,
    PagesClienteMenuPage,
    PagesClienteAnonimoPage,
    PagesClienteAnonimoMenuPage,
    PagesRegistroUsuarioPage,
    PagesReservaPage,
    ListaDeEsperaMenuPage,
    PagesEncuestasUsuariosPage,
    PagesReservasPage,
    PagesEncuestaUsuarioPage,
    PagesJuegosMenuPage,
    PagesPedidosAltaPage, 
    PagesRegistrosPendientesPage,
    PagesMesaPage,
    PagesPedidosListaPage,
    AltaMesaComponent,
    AltaDuenoComponent,
    AltaEmpleadoComponent,
    SolicitudMesaComponent,
    PagesPedidosAltaPage,
    PagesPedidosPendientesMozoPage,
    PagesPedidosDeliveryPage,
    PagesDeliveryBoyPage,
    PagesChatPage,
    PagesProductoCargaMasivaPage,
    PagesProductoListaPage,
    PagesEncuestaIngresoEmpleadoPage,
    PagesEncuestaClientePage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    NativeAudio,
    BarcodeScanner,
    Shake,
    DeviceMotion,
    StatusBar,
    BarcodeScanner,
    EmailComposer,
    Vibration,
    File,
    FileChooser,
    FilePath,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MesasProvider,
    ReservasProvider,
    // Services
    ProductoService,
    CameraService,
    QRService,
    UsuarioService,
    Firebase,
    FcmProvider,
    EncuestaService,
    HttpMailProvider,
    PedidoService,
    SoundsService,
    PedidosProvider,
    MensajesProvider
  ]
})
export class AppModule {}

