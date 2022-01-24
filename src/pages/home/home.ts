import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';

import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BabyDetailPage } from '../baby-detail/baby-detail';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { isNull } from 'util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  proximitySeparator = 450;
  movementSeparator = 450;
  movementBarandaSeparator = 450;
  vibrationSeparator = 100;
  vibrationBarandaSeparator = 100;

  luminosityMin = 0;
  luminosityMax = 1020;

  soundMin = 0;
  soundMax = 940;

  smokeMin = 0;
  smokeMax = 580;

  indicators =  {
    temperature: 'N/A',
    humidity: 'N/A',
    movement: 'N/A',
    movement2: 'N/A',
    piezo: 'N/A',
    piezo2: 'N/A',
    proximity: 'N/A',
    light: 'N/A',
    sound: 'N/A',
    smoke: 'N/A'
  };

  alertaDisparada: boolean;
  alertaTemperatureDisparada: boolean;
  alertaHumidityDisparada: boolean;
  alertaLuminosityDisparada: boolean;
  alertaSoundDisparada: boolean;
  alertaSmokeDisparada: boolean;
  notificationsEnabled:boolean;
  alertaAlguienAfueraDisparada:boolean;
  alertaBebeParadoDisparada:boolean;

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

  movementDetected: boolean;
  movementBarandaDetected: boolean;
  vibrationDetected: boolean;
  vibrationBarandaDetected: boolean;
  proximityDetected: boolean;

  wirelessMode = localStorage.getItem("wirelessMode");
  debugMode = localStorage.getItem("debugMode");

  presetTemperature: any = { lower: 0, upper: 100};
  presetHumidity: any = { lower: 0, upper: 100};
  presetLuminosity: any = { lower: 0, upper: 100};
  presetSound: any = { lower: 0, upper: 100};
  presetSmoke: any = { lower: 0, upper: 100};

  constructor(public _ngZone: NgZone, public navCtrl: NavController, public alertCtrl: AlertController, private http: HttpClient, private database: AngularFireDatabase, public bluetoothSerial: BluetoothSerial, public events: Events, public smartAudio: SmartAudioProvider) {

    smartAudio.preload('siren', 'assets/sounds/siren.mp3');

    if(localStorage.getItem("notificationsEnabled") != null && localStorage.getItem("notificationsEnabled") != 'undefined' && localStorage.getItem("notificationsEnabled") != '') {
      this.notificationsEnabled = (localStorage.getItem("notificationsEnabled")=="true");
    }
    else {
      this.notificationsEnabled = true;
    }

    if(localStorage.getItem("alertaDisparada") != null && localStorage.getItem("alertaDisparada") != 'undefined' && localStorage.getItem("alertaDisparada") != '') {
      this.alertaDisparada = (localStorage.getItem("alertaDisparada")=="true");
    }
    else {
      this.alertaDisparada = false;
      this.alertaTemperatureDisparada = false;
      this.alertaHumidityDisparada = false;
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
  }

  ionViewDidLoad() {

    if(this.wirelessMode == 'bluetooth') {
      let readData$ = Observable.fromPromise(this.bluetoothSerial.read())
              .flatMap(() => {
                  return this.bluetoothSerial.subscribeRawData()
              })
              .flatMap(() => {
                  return this.bluetoothSerial.readUntil('|');   // <= delimiter
              });

      readData$.subscribe( data => {
        console.log(data);

        this._ngZone.run(() => {
          if(data.indexOf("TEMP")>=0){
            this.indicators.temperature = data.substring(data.indexOf("TEMP")+5, data.indexOf("|"));
            localStorage.setItem("indicatorsTemperature",this.indicators.temperature);
          }
          if(data.indexOf("HUME")>=0){
            this.indicators.humidity = data.substring(data.indexOf("HUME")+5, data.indexOf("|"));
            localStorage.setItem("indicatorsHumidity",this.indicators.humidity);
          }
          if(data.indexOf("MOVE")>=0){
            this.indicators.movement = data.substring(data.indexOf("MOVE")+5, data.indexOf("|"));

            if(parseInt(this.indicators.movement)>this.movementSeparator) {
              this.movementDetected = true;
            }
            else {
              this.movementDetected = false;
            }
          }
          if(data.indexOf("PIEZ")>=0){
            this.indicators.piezo = data.substring(data.indexOf("PIEZ")+5, data.indexOf("|"));

            if(parseInt(this.indicators.piezo)>this.vibrationSeparator) {
              this.vibrationDetected = true;
            }
            else {
              this.vibrationDetected = false;
            }
          }
          if(data.indexOf("PROX")>=0){
            this.indicators.proximity = data.substring(data.indexOf("PROX")+5, data.indexOf("|"));

            if(parseInt(this.indicators.proximity)<this.proximitySeparator) {
              this.proximityDetected = true;
            }
            else {
              this.proximityDetected = false;
            }
          }
          if(data.indexOf("LIGH")>=0){
            // // Original
            // this.indicators.light = data.substring(data.indexOf("LIGH")+5, data.indexOf("|"));
            // localStorage.setItem("indicatorsLight",this.indicators.light);

            // Modificado
            var valorLumObtenido = ((parseInt(data.substring(data.indexOf("LIGH")+5, data.indexOf("|")))-this.luminosityMin)*100)/(this.luminosityMax-this.luminosityMin);
            this.indicators.light = valorLumObtenido.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            localStorage.setItem("indicatorsLight",this.indicators.light);
          }
          if(data.indexOf("SOUN")>=0){
            // // Original
            // this.indicators.sound = data.substring(data.indexOf("SOUN")+5, data.indexOf("|"));
            // localStorage.setItem("indicatorsSound",this.indicators.sound);

            // Modificado
            var valorSoundObtenido = ((parseInt(data.substring(data.indexOf("SOUN")+5, data.indexOf("|")))-this.soundMin)*100)/(this.soundMax-this.soundMin);
            this.indicators.sound = valorSoundObtenido.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            localStorage.setItem("indicatorsSound",this.indicators.sound);
          }
          if(data.indexOf("SMOK")>=0){
            // // Original
            // this.indicators.smoke = data.substring(data.indexOf("SMOK")+5, data.indexOf("|"));
            // localStorage.setItem("indicatorsSmoke",this.indicators.smoke);

            // Modificado
            var valorSmokeObtenido = ((parseInt(data.substring(data.indexOf("SMOK")+5, data.indexOf("|")))-this.smokeMin)*100)/(this.smokeMax-this.smokeMin);
            this.indicators.smoke = valorSmokeObtenido.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            localStorage.setItem("indicatorsSmoke",this.indicators.smoke);
          }
          if(data.indexOf("PIEB")>=0){
            this.indicators.piezo2 = data.substring(data.indexOf("PIEB")+5, data.indexOf("|"));

            if(parseInt(this.indicators.piezo2)>this.vibrationBarandaSeparator) {
              this.vibrationBarandaDetected = true;
            }
            else {
              this.vibrationBarandaDetected = false;
            }
          }
          if(data.indexOf("MOVB")>=0){
            this.indicators.movement2 = data.substring(data.indexOf("MOVB")+5, data.indexOf("|"));

            if(parseInt(this.indicators.movement2)>this.movementBarandaSeparator) {
              this.movementBarandaDetected = true;
            }
            else {
              this.movementBarandaDetected = false;
            }
          }

          // ALERTS
          if(this.alertaDisparada == false && this.notificationsEnabled==true) {
            // if temperature excedded parameters
            if(this.temperatureEnabled == true && (parseInt(this.indicators.temperature)<this.presetTemperature.lower || parseInt(this.indicators.temperature)>this.presetTemperature.upper)) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaTemperatureDisparada = true;

              this.smartAudio.play('siren');
              alert("Alerta de temperatura!");
              //this.fireAlarm('temperatureAlarm');
            }

            // if humidity excedded parameters
            if(this.humidityEnabled == true && (parseInt(this.indicators.humidity)<this.presetHumidity.lower || parseInt(this.indicators.humidity)>this.presetHumidity.upper)) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaHumidityDisparada = true;

              this.smartAudio.play('siren');
              alert("Alerta de humedad!");
              //this.fireAlarm('humidityAlarm');
            }

            // if light excedded parameters
            if(this.luminosityEnabled == true && (parseInt(this.indicators.light)<this.presetLuminosity.lower || parseInt(this.indicators.light)>this.presetLuminosity.upper)) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaLuminosityDisparada = true;

              this.smartAudio.play('siren');
              alert("Alerta de luminosidad!");
              //this.fireAlarm('humidityAlarm');
            }

            // if sound excedded parameters
            if(this.soundEnabled == true && (parseInt(this.indicators.sound)<this.presetSound.lower || parseInt(this.indicators.sound)>this.presetSound.upper)) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaSoundDisparada = true;

              this.smartAudio.play('siren');
              alert("Alerta de sonido!");
              //this.fireAlarm('humidityAlarm');
            }

            // if smoke excedded parameters
            if(this.smokeEnabled == true && (parseInt(this.indicators.smoke)<this.presetSmoke.lower || parseInt(this.indicators.smoke)>this.presetSmoke.upper)) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaSmokeDisparada = true;

              this.smartAudio.play('siren');
              alert("Alerta de humos!");
              //this.fireAlarm('humidityAlarm');
            }

            if(this.movementBarandaEnabled == true && this.movementBarandaDetected == true && this.vibrationBarandaEnabled == true && this.vibrationBarandaDetected == true) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaAlguienAfueraDisparada = true;

              this.smartAudio.play('siren');
              alert("Hay un visitante");
              //this.fireAlarm('humidityAlarm');
            }

            if(this.movementEnabled == true && this.movementDetected == true && this.vibrationBarandaEnabled == true && this.vibrationBarandaDetected == true) {
              localStorage.setItem("alertaDisparada","true");
              this.alertaDisparada = true;
              this.alertaBebeParadoDisparada = true;

              this.smartAudio.play('siren');
              alert("Bebé se escapa");
              //this.fireAlarm('humidityAlarm');
            }
          }
        })
      });

    }
    else {
      //alert("Entro con modo wifi");
      this.http.get('http://arkangel.diegobertolini.com/API/obtenerMediciones.php?paramSis=arkangel')
      .subscribe(data => {
        // alert(JSON.stringify(data));
        console.log(data);
        if(!isNull(data)) {
          this.indicators.temperature = data[0].temperatura_ambiente;
          this.indicators.humidity = data[0].humedad_ambiente;
          this.indicators.movement = data[0].movimiento;
          this.indicators.piezo = data[0].vibracion;
          this.indicators.proximity = data[0].proximidad;
        }
      }, err => {
        console.log(err);
      });
    }
  }

  obtenerMediciones()
  {
        // // OBTIENE TODOS LOS MENSAJES YA ESCRITOS
        // var varURL="http://chatito.diegobertolini.com/API/chatClienteServidor_mensaje_obtiene.php";
        // var varParams = {"paramSis":"dab"};
        // $.ajax({
        //     type: "POST",
        //     url: varURL,
        //     data: varParams,
        //     async:false,
        //     dataType: "json",
        //     success: function(data)
        //     {
        //         if(data.retorno=="NULL")
        //         {
        //             // $("#charla").append("" +
        //             // "<li>No hay ningún chat aún.</li>"
        //             // );
        //         }
        //         else
        //         {
        //             var txtAppend="";
        //             for(var i in data)
        //             {
        //                 txtAppend="";
        //                 // SELF
        //                 if(data[i].nickname == localStorage.getItem('nickname'))
        //                 {

        //                     txtAppend += "<li class='self'>";
        //                     txtAppend += 	"<div class='avatar'>";
        //                     txtAppend += 		"<img src='images/chat-jugador-red.png'>";
        //                     txtAppend += 	"</div>";
        //                     txtAppend += 	"<div class='messages'>";
        //                     txtAppend += 		"<p>"+data[i].mensaje+"</p>";
        //                     txtAppend += 		"<time>"+data[i].nickname+"</time>";
        //                     txtAppend += 	"</div>";
        //                     txtAppend += "</li>";
        //                 }
        //                 // OTHER
        //                 else
        //                 {
        //                     txtAppend += "<li class='other'>";
        //                     txtAppend += "	<div class='avatar'>";
        //                     txtAppend += "			<img src='images/chat-jugador-blue.png'>";
        //                     txtAppend += "	</div>";
        //                     txtAppend += "	<div class='messages'>";
        //                     txtAppend += "			<p>"+data[i].mensaje+"</p>";
        //                     txtAppend += "			<time>"+data[i].nickname+"</time>";
        //                     txtAppend += "	</div>";
        //                     txtAppend += "</li>";
        //                 }

        //                 $("#charla").append(txtAppend);
        //             }
        //         }
        //     },
        //     error: function(data)
        //     {
        //         //console.log(data);
        //         alert(JSON.stringify(data));
        //         alert("Hubo un error al obtener los chats.");
        //         window.location = "loginClienteServidor.html";
        //     }
        // });
  }

  fireAlarm(evento) {
    // Throw an event to refresh sidemenu
    this.events.publish('baby:' + evento);
  }

  alertaAtendida() {
    localStorage.setItem("alertaDisparada","false");
    this.alertaDisparada = false;
    this.alertaTemperatureDisparada = false;
    this.alertaHumidityDisparada = false;
    this.alertaAlguienAfueraDisparada = false;
    this.alertaBebeParadoDisparada = false;
  }

}
