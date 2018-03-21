import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
/**
 * Generated class for the ContributorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contributors',
  templateUrl: 'contributors.html',
})
export class ContributorsPage implements OnInit {
  overallContributorsArray: any = [];
  contributorsDetails: any = [];
  constructor(public fetchContributors: FetchServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  ngOnInit() {
    this.fetchContributors.fetchOverallContributors().subscribe(response => {
      this.overallContributorsArray = response['specific_contributors'];
      for (var i = 0; i < this.overallContributorsArray.length; i++) {
        this.contributorsDetails.push([this.overallContributorsArray[i].name, this.overallContributorsArray[i].email_id, this.overallContributorsArray[i].image]);
      }

      for (var x = 0; x < this.contributorsDetails.length; x++) {
        for (var y = x + 1; y < this.contributorsDetails.length; y++) {
          if (this.contributorsDetails[x][1] == this.contributorsDetails[y][1]) {
            this.contributorsDetails[x][0] = ":";
            this.contributorsDetails[x][1] = ":";
            this.contributorsDetails[x][2] = ":";
          }
        }
      }

    })
  }

}
