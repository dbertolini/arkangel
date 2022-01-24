import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configuration-parameters',
  templateUrl: 'configuration-parameters.html',
})
export class ConfigurationParametersPage {

  presetTemperature: any = { lower: 0, upper: 100};
  presetHumidity: any = { lower: 0, upper: 100};
  presetLuminosity: any = { lower: 0, upper: 100};
  presetSound: any = { lower: 0, upper: 100};
  presetSmoke: any = { lower: 0, upper: 100};

  temperatureEnabled: boolean;
  humidityEnabled: boolean;
  luminosityEnabled: boolean;
  soundEnabled: boolean;
  smokeEnabled: boolean;
  notificationsEnabled: boolean;

  indicatorsTemperature = 'N/A';
  indicatorsHumidity = 'N/A';
  indicatorsLight = 'N/A';
  indicatorsSound = 'N/A';
  indicatorsSmoke = 'N/A';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if(localStorage.getItem("notificationsEnabled") != null && localStorage.getItem("notificationsEnabled") != 'undefined' && localStorage.getItem("notificationsEnabled") != '') {
      this.notificationsEnabled = (localStorage.getItem("notificationsEnabled")=="true");
    }
    else {
      this.notificationsEnabled = true;
    }

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

    //presetTemperature: any = { lower: 0, upper: 100};
    if(localStorage.getItem("presetTemperatureLower") != null && localStorage.getItem("presetTemperatureLower") != 'undefined' && localStorage.getItem("presetTemperatureLower") != '') {
      this.presetTemperature.lower = localStorage.getItem("presetTemperatureLower");
    }
    else {
      this.presetTemperature.lower = 0;
    }
    if(localStorage.getItem("presetTemperatureUpper") != null && localStorage.getItem("presetTemperatureUpper") != 'undefined' && localStorage.getItem("presetTemperatureUpper") != '') {
      this.presetTemperature.upper = localStorage.getItem("presetTemperatureUpper");
    }
    else {
      this.presetTemperature.upper = 100;
    }

    //presetHumidity: any = { lower: 0, upper: 100};
    if(localStorage.getItem("presetHumidityLower") != null && localStorage.getItem("presetHumidityLower") != 'undefined' && localStorage.getItem("presetHumidityLower") != '') {
      this.presetHumidity.lower = localStorage.getItem("presetHumidityLower");
    }
    else {
      this.presetHumidity.lower = 0;
    }
    if(localStorage.getItem("presetHumidityUpper") != null && localStorage.getItem("presetHumidityUpper") != 'undefined' && localStorage.getItem("presetHumidityUpper") != '') {
      this.presetHumidity.upper = localStorage.getItem("presetHumidityUpper");
    }
    else {
      this.presetHumidity.upper = 100;
    }

    //presetLuminosity: any = { lower: 0, upper: 100};
    if(localStorage.getItem("presetLuminosityLower") != null && localStorage.getItem("presetLuminosityLower") != 'undefined' && localStorage.getItem("presetLuminosityLower") != '') {
      this.presetLuminosity.lower = localStorage.getItem("presetLuminosityLower");
    }
    else {
      this.presetLuminosity.lower = 0;
    }
    if(localStorage.getItem("presetLuminosityUpper") != null && localStorage.getItem("presetLuminosityUpper") != 'undefined' && localStorage.getItem("presetLuminosityUpper") != '') {
      this.presetLuminosity.upper = localStorage.getItem("presetLuminosityUpper");
    }
    else {
      this.presetLuminosity.upper = 100;
    }

    //presetSound: any = { lower: 0, upper: 100};
    if(localStorage.getItem("presetSoundLower") != null && localStorage.getItem("presetSoundLower") != 'undefined' && localStorage.getItem("presetSoundLower") != '') {
      this.presetSound.lower = localStorage.getItem("presetSoundLower");
    }
    else {
      this.presetSound.lower = 0;
    }
    if(localStorage.getItem("presetSoundUpper") != null && localStorage.getItem("presetSoundUpper") != 'undefined' && localStorage.getItem("presetSoundUpper") != '') {
      this.presetSound.upper = localStorage.getItem("presetSoundUpper");
    }
    else {
      this.presetSound.upper = 100;
    }

    //presetSmoke: any = { lower: 0, upper: 100};
    if(localStorage.getItem("presetSmokeLower") != null && localStorage.getItem("presetSmokeLower") != 'undefined' && localStorage.getItem("presetSmokeLower") != '') {
      this.presetSmoke.lower = localStorage.getItem("presetSmokeLower");
    }
    else {
      this.presetSmoke.lower = 0;
    }
    if(localStorage.getItem("presetSmokeUpper") != null && localStorage.getItem("presetSmokeUpper") != 'undefined' && localStorage.getItem("presetSmokeUpper") != '') {
      this.presetSmoke.upper = localStorage.getItem("presetSmokeUpper");
    }
    else {
      this.presetSmoke.upper = 100;
    }

    //indicatorsTemperature = 'N/A';
    this.indicatorsTemperature = localStorage.getItem("indicatorsTemperature");

    //indicatorsHumidity = 'N/A';
    this.indicatorsHumidity = localStorage.getItem("indicatorsHumidity");

    //indicatorsLight = 'N/A';
    this.indicatorsLight = localStorage.getItem("indicatorsLight");

    //indicatorsSound = 'N/A';
    this.indicatorsSound = localStorage.getItem("indicatorsSound");

    //indicatorsSmoke = 'N/A';
    this.indicatorsSmoke = localStorage.getItem("indicatorsSmoke");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationParametersPage');
  }

  aplicarCambios() {

    localStorage.setItem("notificationsEnabled", this.notificationsEnabled.toString());

    //presetTemperature
    localStorage.setItem("presetTemperatureLower",this.presetTemperature.lower);
    localStorage.setItem("presetTemperatureUpper",this.presetTemperature.upper);

    //presetHumidity
    localStorage.setItem("presetHumidityLower",this.presetHumidity.lower);
    localStorage.setItem("presetHumidityUpper",this.presetHumidity.upper);

    //presetLuminosity
    localStorage.setItem("presetLuminosityLower",this.presetLuminosity.lower);
    localStorage.setItem("presetLuminosityUpper",this.presetLuminosity.upper);

    //presetSound
    localStorage.setItem("presetSoundLower",this.presetSound.lower);
    localStorage.setItem("presetSoundUpper",this.presetSound.upper);

    //presetSmoke
    localStorage.setItem("presetSmokeLower",this.presetSmoke.lower);
    localStorage.setItem("presetSmokeUpper",this.presetSmoke.upper);

    this.navCtrl.pop();
  }

}
