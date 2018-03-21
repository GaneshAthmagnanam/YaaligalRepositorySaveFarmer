import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndividualFarmerDetailsPage } from './individual-farmer-details';

@NgModule({
  declarations: [
    IndividualFarmerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IndividualFarmerDetailsPage),
  ],
})
export class IndividualFarmerDetailsPageModule {}
