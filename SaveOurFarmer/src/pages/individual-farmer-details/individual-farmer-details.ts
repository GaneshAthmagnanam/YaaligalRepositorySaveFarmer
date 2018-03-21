import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
import 'rxjs/add/operator/map'
import { HomePage } from '../home/home';

/**
 * Generated class for the IndividualFarmerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-individual-farmer-details',
  templateUrl: 'individual-farmer-details.html',
})
export class IndividualFarmerDetailsPage implements OnInit {
  farmerId: any;
  individualFarmer: any;
  loggedInName: any;
  loggedInImage: any = null;
  loggedInEmail: any;
  uamount: number;
  socialData: any;
  methodValue: number;
  constructor(public saveData: FetchServiceProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.farmerId = this.navParams.get('itemValue');
    this.loggedInName = this.navParams.get('name');
    this.loggedInImage = this.navParams.get('image');
    this.loggedInEmail = this.navParams.get('email');
    this.socialData = this, navParams.get('socialMediaData');
    this.methodValue = this.navParams.get('method');
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    let url: any = "http://localhost:8008/ourfarmers/" + this.farmerId;
    this.http.get(url).map(response => {
      return response.json();
    }
    ).subscribe(res => {
      this.individualFarmer = res['farmerindividualdetails'];
    })

  }
  pay() {
    if (this.loggedInImage == null) {
      this.loggedInImage = "assets/noImage.png";
    }
    this.saveData.saveTransaction(this.loggedInEmail,
      this.loggedInName, this.uamount, this.farmerId, this.loggedInImage).subscribe(res => {
        if (res.text() == "Transaction Completed, Updation Done Successfully") {
          this.navCtrl.setRoot(HomePage, {
            method: this.methodValue, mailId: this.loggedInEmail,
            name: this.loggedInName, data: this.socialData
          });
        }
      })


  }

}
