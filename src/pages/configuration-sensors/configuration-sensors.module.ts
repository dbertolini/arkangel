import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationSensorsPage } from './configuration-sensors';

@NgModule({
  declarations: [
    ConfigurationSensorsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationSensorsPage),
  ],
})
export class ConfigurationSensorsPageModule {}
