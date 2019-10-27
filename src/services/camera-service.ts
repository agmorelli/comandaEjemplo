import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

    private options: CameraOptions;
  
	constructor(private camera: Camera) {
        this.options =  {
            quality: 60,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: false
        }
	}

    takePhoto(){
        return this.camera.getPicture(this.options);
    }

}