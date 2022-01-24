import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configuration-sensors',
  templateUrl: 'configuration-sensors.html',
})
export class ConfigurationSensorsPage {

  temperatureEnabled: boolean;
  humidityEnabled: boolean;
  movementEnabled: boolean;
  movementBarandaEnabled: boolean;
  vibrationEnabled: boolean;
  vibrationBarandaEnabled: boolean;
  proximityEnabled: boolean;
  luminosityEnabled: boolean;
  soundEnabled: boolean;
  smokeEnabled: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem("temperatureEnabled") != null && localStorage.getItem("temperatureEnabled") != 'undefined' && localStorage.getItem("temperatureEnabled") != '') {
      this.temperatureEnabled = (localStorage.getItem("temperatureEnabled")=="true");
    }
    else {
      this.temperatureEnabled = true;
    }

    if(localStorage.getItem("humidityEnabled") != null && localStorage.getItem("humidityEnabled") != 'undefined' && localStorage.getItem("humidityEnabled") != '') {
      this.humidityEnabled = (localStorage.getItem("humidityEnabled")=="true");
    }
    else {
      this.humidityEnabled = true;
    }

    if(localStorage.getItem("movementEnabled") != null && localStorage.getItem("movementEnabled") != 'undefined' && localStorage.getItem("movementEnabled") != '') {
      this.movementEnabled = (localStorage.getItem("movementEnabled")=="true");
    }
    else {
      this.movementEnabled = true;
    }

    if(localStorage.getItem("movementBarandaEnabled") != null && localStorage.getItem("movementBarandaEnabled") != 'undefined' && localStorage.getItem("movementBarandaEnabled") != '') {
      this.movementBarandaEnabled = (localStorage.getItem("movementBarandaEnabled")=="true");
    }
    else {
      this.movementBarandaEnabled = true;
    }

    if(localStorage.getItem("vibrationEnabled") != null && localStorage.getItem("vibrationEnabled") != 'undefined' && localStorage.getItem("vibrationEnabled") != '') {
      this.vibrationEnabled = (localStorage.getItem("vibrationEnabled")=="true");
    }
    else {
      this.vibrationEnabled = true;
    }

    if(localStorage.getItem("vibrationBarandaEnabled") != null && localStorage.getItem("vibrationBarandaEnabled") != 'undefined' && localStorage.getItem("vibrationBarandaEnabled") != '') {
      this.vibrationBarandaEnabled = (localStorage.getItem("vibrationBarandaEnabled")=="true");
    }
    else {
      this.vibrationBarandaEnabled = true;
    }

    if(localStorage.getItem("proximityEnabled") != null && localStorage.getItem("proximityEnabled") != 'undefined' && localStorage.getItem("proximityEnabled") != '') {
      this.proximityEnabled = (localStorage.getItem("proximityEnabled")=="true");
    }
    else {
      this.proximityEnabled = true;
    }

    if(localStorage.getItem("luminosityEnabled") != null && localStorage.getItem("luminosityEnabled") != 'undefined' && localStorage.getItem("luminosityEnabled") != '') {
      this.luminosityEnabled = (localStorage.getItem("luminosityEnabled")=="true");
    }
    else {
      this.luminosityEnabled = true;
    }

    if(localStorage.getItem("soundEnabled") != null && localStorage.getItem("soundEnabled") != 'undefined' && localStorage.getItem("soundEnabled") != '') {
      this.soundEnabled = (localStorage.getItem("soundEnabled")=="true");
    }
    else {
      this.soundEnabled = true;
    }

    if(localStorage.getItem("smokeEnabled") != null && localStorage.getItem("smokeEnabled") != 'undefined' && localStorage.getItem("smokeEnabled") != '') {
      this.smokeEnabled = (localStorage.getItem("smokeEnabled")=="true");
    }
    else {
      this.smokeEnabled = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationSensorsPage');
  }

  refreshSensors() {
    localStorage.setItem("temperatureEnabled", this.temperatureEnabled.toString());
    localStorage.setItem("humidityEnabled", this.humidityEnabled.toString());
    localStorage.setItem("movementEnabled", this.movementEnabled.toString());
    localStorage.setItem("movementBarandaEnabled", this.movementBarandaEnabled.toString());
    localStorage.setItem("vibrationEnabled", this.vibrationEnabled.toString());
    localStorage.setItem("vibrationBarandaEnabled", this.vibrationBarandaEnabled.toString());
    localStorage.setItem("proximityEnabled", this.proximityEnabled.toString());
    localStorage.setItem("luminosityEnabled", this.luminosityEnabled.toString());
    localStorage.setItem("soundEnabled", this.soundEnabled.toString());
    localStorage.setItem("smokeEnabled", this.smokeEnabled.toString());
  }

}
