import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable()
export class QRService {
  
	constructor(private barcodeScanner: BarcodeScanner) {}

    readQR(){
        return this.barcodeScanner.scan();
    }

}