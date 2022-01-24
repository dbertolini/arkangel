import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PairPage } from '../pages/pair/pair';
import { WelcomePage } from '../pages/welcome/welcome';
import { ConfigurationPage } from '../pages/configuration/configuration';

import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { BabyDetailPage } from '../pages/baby-detail/baby-detail';
import { ControlPage } from '../pages/control/control';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  // CONFIG PARAMETERS------------------
  //debugMode='ON';
  debugMode='OFF'; //////////////

  alertMode='ON'; //////////////
  //alertMode='OFF';
  notificationsEnabled:boolean;

  //rootPage: any = WelcomePage;
  rootPage: any = PairPage; //////////
  //rootPage: any = BabyDetailPage;

  wirelessMode:any;
  //-------------------------------------

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  loader = this.loading.create({
    content: "Por favor, espere mientras se conecta con el dispositivo de Arcangel..."
  });

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public bluetoothSerial: BluetoothSerial, public alertCtrl: AlertController, public loading: LoadingController, public toast: ToastController, public events: Events, public smartAudio: SmartAudioProvider) {
    this.initializeApp();

    if(localStorage.getItem("notificationsEnabled") != null && localStorage.getItem("notificationsEnabled") != 'undefined' && localStorage.getItem("notificationsEnabled") != '') {
      this.notificationsEnabled = (localStorage.getItem("notificationsEnabled")=="true");
    }
    else {
      this.notificationsEnabled = true;
    }

    localStorage.setItem("debugMode",this.debugMode);
    //localStorage.setItem("wirelessMode","wifi"); ////////////////////// Comentar luego
    localStorage.setItem("wirelessMode","bluetooth"); ////////////////////// Comentar luego

    if(localStorage.getItem("wirelessMode") != null && localStorage.getItem("wirelessMode") != 'undefined' && localStorage.getItem("wirelessMode") != '') {
      this.wirelessMode = localStorage.getItem("wirelessMode");
    }
    else {
      this.wirelessMode = 'bluetooth';
    }

    // smartAudio.preload('siren', 'assets/sounds/siren.mp3');

    // // Set a listener to baby alarm
    // events.subscribe('baby:genericAlarm', (user, time) => {
    //   if(this.alertMode=='ON' && this.notificationsEnabled==true) {
    //     //this.smartAudio.play('siren');
    //     alert("Hay un problema con el baby!");
    //   }
    // });

    // events.subscribe('baby:temperatureAlarm', (user, time) => {
    //   if(this.alertMode=='ON' && this.notificationsEnabled==true) {
    //     //this.smartAudio.play('siren');
    //     alert("Alerta de temperatura!");
    //   }
    // });

    // events.subscribe('baby:humidityAlarm', (user, time) => {
    //   if(this.alertMode=='ON' && this.notificationsEnabled==true) {
    //     //this.smartAudio.play('siren');
    //     alert("Alerta de humedad!");
    //   }
    // });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mediciones', component: HomePage },
      { title: 'Estadísticas', component: BabyDetailPage },
      { title: 'Control a distancia', component: ControlPage },
      { title: 'Configuración', component: ConfigurationPage }
    ];

    if(this.debugMode!='ON')
    {
      // Is there any previous device connected?
      if(this.wirelessMode == 'bluetooth') {
        // // 20:16:03:30:56:34
        // localStorage.setItem("bluetoothAddress","20:16:03:30:56:34");
        if(localStorage.getItem("bluetoothAddress") != null && localStorage.getItem("bluetoothAddress") != 'undefined' && localStorage.getItem("bluetoothAddress") != '') {
          this.bluetoothSerial.enable();


          let alert = this.alertCtrl.create({
            title: 'Conectar dispositivo',
            message: '¿Quiere conectarse al último dispositivo utilizado? Si es así, por favor asegúrese que esté encendido.',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  //this.nav.setRoot(PairPage);
                  this.rootPage = PairPage;
                }
              },
              {
                text: 'Conectar',
                handler: () => {

                  this.loader.present();

                  this.bluetoothSerial.connect(localStorage.getItem("bluetoothAddress")).subscribe(this.success, this.fail);
                }
              }
            ]
          });
          alert.present();
        }
        else {
          //this.nav.setRoot(PairPage);
          this.rootPage = PairPage;
        }
      }
    }
    else {
      //this.nav.setRoot(HomePage);
      this.rootPage = HomePage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // If connection was succeded
  success = (data) => {
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Conexión satisfactoria.',
      duration: 4000
    });
    toaster.present();

    this.loader.dismiss();

    this.nav.setRoot(HomePage);
  }

  // If connection was not succeded
  fail = (error) => {
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Hubo un error al conectar con el dispositivo',
      duration: 4000
    });
    toaster.present();

    this.loader.dismiss();

    this.nav.setRoot(PairPage);
  }
}
