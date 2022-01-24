import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationParametersPage } from './configuration-parameters';

@NgModule({
  declarations: [
    ConfigurationParametersPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationParametersPage),
  ],
})
export class ConfigurationParametersPageModule {}
