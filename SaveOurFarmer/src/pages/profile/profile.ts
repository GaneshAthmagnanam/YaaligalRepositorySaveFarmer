import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login'
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name: any;
  image: any;
  emailId: any;
  method: number;
  editName: boolean = false;
  public base64Image: any;
  imgSuccessMsg: String = "";
  newName: any;
  key: any;
  errorMsg: any;
  transKey: any;
  constructor(public toastCtrl: ToastController, private fireauth: AngularFireAuth,
    public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.emailId = this.navParams.get('email');
    this.method = this.navParams.get('method');
    if (this.method == 1) {
      this.image = "assets/noImage.png";
    }
    if (this.method == 2 || this.method == 3) {
      this.image = this.navParams.get('image');
    }


  }
  changePassword() {
    this.fireauth.auth.sendPasswordResetEmail(this.emailId).then(s => {
      this.presentToast();
    }).catch(error => {
      this.errorMsg = error['message'];
      // alert(error);
    })
  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Link for password change has been mailed, kindly check your mail',
      duration: 3500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.setRoot(LoginPage);

    });

    toast.present();
  }
  ionViewDidLoad() {

  }

}
