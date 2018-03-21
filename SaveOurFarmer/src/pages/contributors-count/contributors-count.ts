import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
/**
 * Generated class for the ContributorsCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contributors-count',
  templateUrl: 'contributors-count.html',
})
export class ContributorsCountPage implements OnInit {
  farmerIdentifier: String;
  totalCountArray: any = [];
  specificCountArray: any = [];
  constructor(public fetchContributors: FetchServiceProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.farmerIdentifier = this.navParams.get('farmerId');
  }

  ngOnInit() {
    this.fetchContributors.fetchOverallContributors().subscribe(response => {
      this.totalCountArray = response['specific_contributors'];
      for (var i = 0; i < this.totalCountArray.length; i++) {
        if (this.farmerIdentifier == this.totalCountArray[i].farmer_id) {
          this.specificCountArray.push(this.totalCountArray[i]);
        }
      }
    })
  }
  dismissView() {
    this.viewCtrl.dismiss();
  }
}
