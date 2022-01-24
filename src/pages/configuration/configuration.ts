import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PairPage } from '../pair/pair';
import { ConfigurationParametersPage } from '../configuration-parameters/configuration-parameters';
import { ConfigurationWirelessPage } from '../configuration-wireless/configuration-wireless';
import { ConfigurationSensorsPage } from '../configuration-sensors/configuration-sensors';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {



  wirelessMode:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial, public alertCtrl: AlertController, public loading: LoadingController, public toast: ToastController) {

    if(localStorage.getItem("wirelessMode") != null && localStorage.getItem("wirelessMode") != 'undefined' && localStorage.getItem("wirelessMode") != '') {
      this.wirelessMode = localStorage.getItem("wirelessMode");
    }
    else {
      this.wirelessMode = 'bluetooth';
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  goToConfigurationSensors() {
    this.navCtrl.push(ConfigurationSensorsPage);
  }

  goToConfigurationParameters() {
    this.navCtrl.push(ConfigurationParametersPage);
  }

  goToConfigurationWireless() {
    this.navCtrl.push(ConfigurationWirelessPage);
  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Desconectar dispositivo',
      message: '¿Realmente quiere desconectar el dispositivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Desconectar',
          handler: () => {
            this.bluetoothSerial.disconnect();
            localStorage.removeItem("bluetoothAddress");
            this.navCtrl.setRoot(PairPage);
          }
        }
      ]
    });
    alert.present();
  }

}
