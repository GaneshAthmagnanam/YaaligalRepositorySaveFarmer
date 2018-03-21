import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: any;
  password: any;
  errorMsg: String = '';
  errorMsg1: String = '';
  fbUserData: any;
  googleUserData: any;
  errorMsg2: String = '';
  loginMethod: number;
  displayName: any;
  constructor(private fb: Facebook, public navCtrl: NavController, public googleplus: GooglePlus, private fireauth: AngularFireAuth) {

  }
  async login() {
    this.errorMsg = "";
    this.errorMsg1 = "";
    this.errorMsg2 = "";
    try {
      await this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password).then(succ => {
        var verify = this.fireauth.auth.currentUser.emailVerified;
        this.loginMethod = 1;
        this.displayName = this.fireauth.auth.currentUser.displayName;
        if (verify) {
          this.navCtrl.setRoot(HomePage, { name: this.displayName, method: this.loginMethod, mailId: this.email });
        }
        else {
          this.fireauth.auth.currentUser.sendEmailVerification().then(function () {
          }).catch(function (error) {
          });
          this.errorMsg = "";
          this.errorMsg = "Your email Id is not verfired, new mail has been sent for verification."
        }
      }).catch(error => {
        this.errorMsg = "";
        this.errorMsg = error['message'];
      })

    }
    catch (error) {
      this.errorMsg = "";
    }


  }
  register() {
    this.navCtrl.push('RegisterPage');
  }

  loginGoogle() {
    //alert("1");
    this.errorMsg = "";
    this.errorMsg1 = "";
    this.errorMsg2 = "";
    this.googleplus.login({
      'webClientId': '286295053668-u092dk6ko6pali7gbeph9i3t9ltoppsj.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      //alert("2");
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          //alert("3");
          this.loginMethod = 2;
          var uname = firebase.auth().currentUser.displayName;
          var email = firebase.auth().currentUser.email;
          var image = firebase.auth().currentUser.photoURL;
          this.googleUserData = { email: email, image: image, uName: uname };
          //this.navCtrl.
          this.navCtrl.setRoot(HomePage, { method: this.loginMethod, data: this.googleUserData });
        }).catch(ns => {

          this.errorMsg1 = "";
          this.errorMsg1 = ns['message'];
        })
    }, error => {
      this.errorMsg1 = "";
      this.errorMsg1 = error['message'];
    })
  }
  loginFB() {
    this.errorMsg = "";
    this.errorMsg1 = "";
    this.errorMsg2 = "";
    try {

      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          this.loginMethod = 3;
          this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
            this.fbUserData = { email: profile['email'], firstName: profile['first_name'], image: profile['picture_large']['data']['url'], uName: profile['name'], id: profile['id'] }
            this.navCtrl.setRoot(HomePage, { method: this.loginMethod, data: this.fbUserData });
          }).catch(e => {
            this.errorMsg2 = "";
            this.errorMsg2 = e['message'];
          })
        }).catch(e => {
          this.errorMsg2 = "";
          this.errorMsg2 = e['message'];
        });
    }
    catch (error) {
      this.errorMsg2 = "";
      this.errorMsg2 = error['message'];
    }
  }

  resetPwd() {
    this.navCtrl.push('ResetpasswordPage');
  }

  logout(value) {
    if (value == 3) {
      this.fb.logout().then((response) => {
        //alert(JSON.stringify(response));
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        //alert(error);
      })
    }
  }
}
