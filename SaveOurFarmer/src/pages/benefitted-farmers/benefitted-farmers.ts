import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
/**
 * Generated class for the BenefittedFarmersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-benefitted-farmers',
  templateUrl: 'benefitted-farmers.html',
})
export class BenefittedFarmersPage implements OnInit {
  allFarmerDetails: any;
  benefittedFarmers: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: FetchServiceProvider) {
  }

  ngOnInit() {
    this.service.fetchFarmerDetails().subscribe(res => {
      this.allFarmerDetails = res['farmer_details'];
      for (var i = 0; i < this.allFarmerDetails.length; i++) {
        if (this.allFarmerDetails[i].amount_pending == 0) {
          this.benefittedFarmers.push(this.allFarmerDetails[i]);
        }
      }

    })
  }

}
