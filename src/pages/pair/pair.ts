import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Slides  } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-pair',
  templateUrl: 'pair.html',
})
export class PairPage {

  @ViewChild(Slides) slides: Slides;

  loaderConnecting = this.loading.create({
    content: "Por favor, espere mientras se conecta al dispositivos de Arcangel..."
  });

  unpairedDevices: any;
  gettingDevices: Boolean;

  loader = this.loading.create({
    content: "Por favor, espere mientras se conecta con el dispositivo de Arcangel..."
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetoothSerial: BluetoothSerial, public alertCtrl: AlertController, public loading: LoadingController, public toast: ToastController) {
    this.unpairedDevices = null;
    this.gettingDevices = true;
  }

  goToSlide(slideId) {
    this.slides.slideTo(slideId-1);
    // if(slideId==2) {
    //   this.startScanning();
    // }
  }

  startScanning() {

    // Loading spinner
    let loader = this.loading.create({
      content: "Por favor, espere mientras se buscan dispositivos de Arcangel..."
    });
    loader.present();

    this.bluetoothSerial.enable();

    this.bluetoothSerial.discoverUnpaired()
    .then(success => {

      for(var index in success) {
        if(!success[index].name.includes("Arkang")) {
          delete success[index];
        }
      }

      this.unpairedDevices = success;

      // this.gettingDevices = false;
      //success.forEach(element => {
        // alert(element.name);
      //});

      loader.dismiss();
    })
    .catch(err => {
      console.log(err);

      this.goToSlide(1);

      loader.dismiss();

      // Toast message about event
      let toaster = this.toast.create({
        message: 'Error al obtener los dispositivos.',
        duration: 4000
      });
      toaster.present();

    });

  }

  // If connection was succeded
  success = (data) => {
    this.loaderConnecting.dismiss();
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Conexión satisfactoria.',
      duration: 4000
    });
    toaster.present();

    this.navCtrl.setRoot(HomePage);
  }

  // If connection was not succeded
  fail = (error) => {
    this.loaderConnecting.dismiss();
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Hubo un error al conectar con el dispositivo',
      duration: 4000
    });
    toaster.present();
  }

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connectar dispositivo',
      message: '¿Realmente quiere conectarse al dispositivo seleccionado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conectar',
          handler: () => {
            this.loaderConnecting.present();
            localStorage.setItem("bluetoothAddress",address);
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

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
          }
        }
      ]
    });
    alert.present();
  }

  conectarYaConocido() {
    // 20:16:03:30:56:34
    localStorage.setItem("bluetoothAddress","20:16:03:30:56:34");

    this.bluetoothSerial.enable();

    this.loader.present();

    this.bluetoothSerial.connect(localStorage.getItem("bluetoothAddress")).subscribe(this.success2, this.fail2);
  }

  // If connection was succeded
  success2 = (data) => {
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Conexión satisfactoria.',
      duration: 4000
    });
    toaster.present();

    this.loader.dismiss();

    this.navCtrl.setRoot(HomePage);
  }

  // If connection was not succeded
  fail2 = (error) => {
    // Toast message about event
    let toaster = this.toast.create({
      message: 'Hubo un error al conectar con el dispositivo',
      duration: 4000
    });
    toaster.present();

    this.loader.dismiss();

    this.navCtrl.setRoot(PairPage);
  }

}
