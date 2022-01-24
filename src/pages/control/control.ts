import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial, public events: Events, public smartAudio: SmartAudioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
  }

  pinValueChange(pin, value) {

    var send = pin + '_' + value + '|';

    this.bluetoothSerial.isConnected()
    .then(data => {
        this.bluetoothSerial.write(send).then(data => {
          console.log("Data sent!");
        },
        error =>{
          alert("Hubo un error");
        });
    })
    .catch(error => {
      alert("Hubo un error");
    });

  }

  fireAlarm() {
    // Throw an event to refresh sidemenu
    this.events.publish('baby:genericAlarm');
  }

}
