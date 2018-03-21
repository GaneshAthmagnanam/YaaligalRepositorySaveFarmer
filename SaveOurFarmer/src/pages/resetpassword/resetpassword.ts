import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login'
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  email: any;
  errorMsg: String;
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth) {
  }

  ionViewDidLoad() {

  }
  resetPassword() {
    try {
      this.errorMsg = "";
      //this.fireauth.auth.
      this.fireauth.auth.sendPasswordResetEmail(this.email).then(succ => {
        this.presentToast();
        //alert("");
        this.navCtrl.setRoot(LoginPage);
      }).catch(error => {
        this.errorMsg = error['message'];

      })


    }
    catch (error) {
      this.errorMsg = "";

      this.errorMsg = error['message'];
    }

  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Link for password Reset has been mailed, kindly check your mail',
      duration: 3500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

}
