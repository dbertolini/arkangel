import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { PairPage } from '../pages/pair/pair';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { BabyDetailPage } from '../pages/baby-detail/baby-detail';
import { LoginPage } from '../pages/login/login';
import { ConfigurationParametersPage } from '../pages/configuration-parameters/configuration-parameters';
import { ConfigurationWirelessPage } from '../pages/configuration-wireless/configuration-wireless';
import { ConfigurationSensorsPage } from '../pages/configuration-sensors/configuration-sensors';
import { ControlPage } from '../pages/control/control';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';

export const firebaseConfig = {
  apiKey: "AIzaSyCPSg9MQMgcofWkmIA9krNFWyp3RixgWzc",
  authDomain: "arkangel-3c1ae.firebaseapp.com",
  databaseURL: "https://arkangel-3c1ae.firebaseio.com",
  projectId: "arkangel-3c1ae",
  storageBucket: "arkangel-3c1ae.appspot.com",
  messagingSenderId: "355845142582"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    PairPage,
    ConfigurationPage,
    BabyDetailPage,
    LoginPage,
    ConfigurationParametersPage,
    ConfigurationWirelessPage,
    ConfigurationSensorsPage,
    ControlPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    PairPage,
    ConfigurationPage,
    BabyDetailPage,
    LoginPage,
    ConfigurationParametersPage,
    ConfigurationWirelessPage,
    ConfigurationSensorsPage,
    ControlPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    SmartAudioProvider,
    NativeAudio
  ]
})
export class AppModule {}
