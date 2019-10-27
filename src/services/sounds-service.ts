import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class SoundsService {

	constructor(private nativeAudio: NativeAudio, private vibration: Vibration) {
        this.cargarSonidos();
    }
    
    private cargarSonidos(){
        this.nativeAudio.preloadSimple('success', 'assets/sounds/success.mp3').then(function (msg) {}, function (error) {});
        this.nativeAudio.preloadSimple('error', 'assets/sounds/error.mp3').then(function (msg) {}, function (error) {});
        this.nativeAudio.preloadSimple('logout', 'assets/sounds/logout.mp3').then(function (msg) {}, function (error) {});
        this.nativeAudio.preloadSimple('lose', 'assets/sounds/lose.mp3').then(function (msg) {}, function (error) {});
    }

    sound(sound: string){
        this.nativeAudio.play(sound);
        if(sound === 'error'){
            this.vibration.vibrate(1000);
        }
    }

}