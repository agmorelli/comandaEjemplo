import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, Navbar } from 'ionic-angular';
import { ListaDeEsperaMenuPage } from '../pages-lista-de-espera/pages-lista-de-espera-menu/pages-lista-de-espera-menu';
import { MesasProvider } from '../../providers/mesas/mesas';
import { PagesMesaPage } from '../pages-mesa/pages-mesa';
import { PagesPedidosPendientesMozoPage } from '../pages-pedidos-pendientes-mozo/pages-pedidos-pendientes-mozo';
import { SoundsService } from '../../services/sounds-service';

@IonicPage()
@Component({
  selector: 'page-pages-mozo',
  templateUrl: 'pages-mozo.html',
})
export class PagesMozoPage {

  @ViewChild(Navbar) navBar: Navbar;

  listaEspera = ListaDeEsperaMenuPage;
  listaMesas;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mesasProv: MesasProvider,
    private soundsService: SoundsService) {
    this.TraerMesas();
  }

  ionViewDidLoad(){
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.soundsService.sound('logout');
      this.navCtrl.pop();
     }
  }

  ListaEspera() {
    this.navCtrl.push(this.listaEspera);
  }

  TraerMesas() {/*
    this.listaMesas = this.mesasProv.mesas;*/

    this.mesasProv.TraerMesasMozo().subscribe(arr => {
   
      this.listaMesas = arr.map(function(mesa, index){
        return mesa;
      });
    });
    console.log(this.listaMesas);
  }

  PedidosPendientes() {
    this.navCtrl.push(PagesPedidosPendientesMozoPage);
  }


  Opciones(mesa) {

    if (mesa.estado == "ocupada") {
      this.navCtrl.push(PagesMesaPage, { "mesa": mesa });
    }
  }

}
