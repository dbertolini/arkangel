import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationWirelessPage } from './configuration-wireless';

@NgModule({
  declarations: [
    ConfigurationWirelessPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationWirelessPage),
  ],
})
export class ConfigurationWirelessPageModule {}
