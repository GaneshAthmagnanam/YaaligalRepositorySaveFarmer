import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
/**
 * Generated class for the MyTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-transactions',
  templateUrl: 'my-transactions.html',
})
export class MyTransactionsPage implements OnInit {
  overallContributorsArray: any = [];
  myTransactionArray: any = [];
  userEmailId: any;
  constructor(public fetchContributors: FetchServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userEmailId = this.navParams.get('mailId');
  }

  ionViewDidLoad() {

  }
  ngOnInit() {

    this.fetchContributors.fetchOverallContributors().subscribe(response => {
      this.overallContributorsArray = response['specific contibutors'];
      for (var i = 0; i < this.overallContributorsArray.length; i++) {

        if (this.overallContributorsArray[i].emailId == this.userEmailId) {
          this.myTransactionArray.push([this.overallContributorsArray[i].transactionId, this.overallContributorsArray[i].amountPaid, this.overallContributorsArray[i].farmerId]);
        }

      }



    })
  }

}
