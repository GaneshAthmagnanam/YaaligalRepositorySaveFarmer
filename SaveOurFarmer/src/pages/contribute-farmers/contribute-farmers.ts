import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContributeFarmersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribute-farmers',
  templateUrl: 'contribute-farmers.html',
})
export class ContributeFarmersPage {
  loggedInName: any;
  loggedInEmail: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loggedInName = this.navParams.get('name');
    this.loggedInEmail = this.navParams.get('mailId');
  }

  ionViewDidLoad() {
  }

}
