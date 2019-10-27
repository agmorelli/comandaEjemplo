import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ProductoService } from '../../../services/producto-service';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { showAlert, spin, replaceAll } from '../../../environments/environment';
import { SoundsService } from '../../../services/sounds-service';
import { Producto } from '../../../clases/Producto';
import { Usuario } from '../../../clases/usuario';
import { FilePath } from '@ionic-native/file-path';

declare var require: any;
let converter = require('json-2-csv');

@IonicPage()
@Component({
  selector: 'page-pages-producto-carga-masiva',
  templateUrl: 'pages-producto-carga-masiva.html',
})
export class PagesProductoCargaMasivaPage {

  type: any;
  usuario: Usuario;

  productos: Array<Producto>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public fileChooser: FileChooser,
    public file: File,
    public alertCtrl: AlertController,
    public soundsService: SoundsService,
    public modalController: ModalController,
    private filePath: FilePath) {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    productoService.traerProductos().subscribe(data => {
      this.productos = data;
    })
  }

  cargaJSON() {
    var superScope = this;
    this.fileChooser.open()
      .then(uri => {
        superScope.filePath.resolveNativePath(uri)
          .then(filePath => {
            var path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
            var archivo = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);

            spin(superScope.modalController, true);
            superScope.file.readAsText(path, archivo).then(text => {
              let productos: Array<Producto> = JSON.parse(text);
              //Filtro comidas para cocinero
              if (superScope.usuario.tipo === "cocinero") {
                productos = productos.filter(producto => {
                  return producto.tipo === "comida"
                })
              }
              //Filtro bebidas para bartener
              if (superScope.usuario.tipo === "bartender") {
                productos = productos.filter(producto => {
                  return producto.tipo === "bebida"
                })
              }
              //Filtro productos ya existentes
              productos = productos.filter(producto => {
                return superScope.productos.map(a => { return a.nombre }).indexOf(producto.nombre) === -1
              })
              if (productos.length === 0) {
                spin(superScope.modalController, false);
                showAlert(superScope.alertCtrl, "Error", "Los productos ya estan cargados en el sistema!", superScope.soundsService, 'error');
              }
              productos.forEach((producto, index) => {
                superScope.productoService.cargarProducto(JSON.parse(JSON.stringify(producto))).then(() => {
                  if (index === productos.length - 1) {
                    spin(superScope.modalController, false);
                    showAlert(superScope.alertCtrl, "Exito", "Productos dado de alta con exito!", superScope.soundsService, 'success');
                  }
                }).catch(error => {
                  spin(superScope.modalController, false);
                  showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
                });
              });
            }).catch(error => {
              spin(superScope.modalController, false);
              showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
            });

          })
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }

  descargaJSON() {
    this.productoService.traerProductos().subscribe(productos => {
      spin(this.modalController, true);
      this.file.writeFile(this.file.externalRootDirectory, "productos.json", JSON.stringify(productos), {
        "replace": true
      }).then(response => {
        spin(this.modalController, false);
        showAlert(this.alertCtrl, "Exito", "Archivo creado con exito en: " + response.fullPath, this.soundsService, 'success');
      }).catch(error => {
        spin(this.modalController, false);
        showAlert(this.alertCtrl, "Error", error, this.soundsService, 'error');
      });
    });
  }

  cargaCSV() {
    var superScope = this;
    this.fileChooser.open()
      .then(uri => {
        superScope.filePath.resolveNativePath(uri)
          .then(filePath => {
            var path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
            var archivo = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);

            spin(superScope.modalController, true);
            superScope.file.readAsText(path, archivo).then(text => {
              converter.csv2json(text, function (err, productos) {
                if (err) throw err;
                productos = JSON.parse(replaceAll(JSON.stringify(productos), "\\r", ""));
                //Filtro comidas para cocinero
                if (superScope.usuario.tipo === "cocinero") {
                  productos = productos.filter(producto => {
                    return producto.tipo === "comida"
                  })
                }
                //Filtro bebidas para bartener
                if (superScope.usuario.tipo === "bartender") {
                  productos = productos.filter(producto => {
                    return producto.tipo === "bebida"
                  })
                }
                //Filtro productos ya existentes
                productos = productos.filter(producto => {
                  return superScope.productos.map(a => { return a.nombre }).indexOf(producto.nombre) === -1
                })
                if (productos.length === 0) {
                  spin(superScope.modalController, false);
                  showAlert(superScope.alertCtrl, "Error", "Los productos ya estan cargados en el sistema!", superScope.soundsService, 'error');
                }
                productos.forEach((producto, index) => {
                  superScope.productoService.cargarProducto(JSON.parse(JSON.stringify(producto))).then(() => {
                    if (index === productos.length - 1) {
                      spin(superScope.modalController, false);
                      showAlert(superScope.alertCtrl, "Exito", "Productos dado de alta con exito!", superScope.soundsService, 'success');
                    }
                  }).catch(error => {
                    spin(superScope.modalController, false);
                    showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
                  });
                });
              });
            }).catch(error => {
              spin(superScope.modalController, false);
              showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
            });
          })
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }

  descargaCSV() {
    var superScope = this;
    this.productoService.traerProductos().subscribe(productos => {
      spin(this.modalController, true);
      converter.json2csv(productos, function (err, csv) {
        if (err) throw err;
        superScope.file.writeFile(superScope.file.externalRootDirectory, "productos.csv", csv, {
          "replace": true
        }).then(response => {
          spin(superScope.modalController, false);
          showAlert(superScope.alertCtrl, "Exito", "Archivo creado con exito en: " + response.fullPath, superScope.soundsService, 'success');
        }).catch(error => {
          spin(superScope.modalController, false);
          showAlert(superScope.alertCtrl, "Error", error, superScope.soundsService, 'error');
        });
      }, {
          emptyFieldValue: ""
        });
    });
  }

}
