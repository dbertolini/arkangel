import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BabyDetailPage } from './baby-detail';

@NgModule({
  declarations: [
    BabyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BabyDetailPage),
  ],
})
export class BabyDetailPageModule {}
