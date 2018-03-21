import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContributorsCountPage } from './contributors-count';

@NgModule({
  declarations: [
    ContributorsCountPage,
  ],
  imports: [
    IonicPageModule.forChild(ContributorsCountPage),
  ],
})
export class ContributorsCountPageModule {}
