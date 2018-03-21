import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController, NavParams } from 'ionic-angular';
import { FetchServiceProvider } from '../../providers/fetch-service/fetch-service';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  farmerDetails: any=[];
  backUpFarmerDetails:any;
  fbData: any;
  searchQuery: any;
  loggedUserName: any;
  loggedUserImage: any;
  authMethod: number;
  mailIdentifier: any;
  pendingFarmerDetails: any = [];
  pages: Array<{ title: string, component: any }>;
  constructor(public googleplus: GooglePlus,
    public fb: Facebook, public fireauth: AngularFireAuth, public navParams: NavParams, public modalCtrl: ModalController, public navCtrl: NavController, public service: FetchServiceProvider) {
    this.authMethod = this.navParams.get('method');
    console.log("inside cons");
   
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Profile', component: 'ProfilePage' },
      { title: 'Contribute to Farmers Account', component: 'ContributeFarmersPage' },
      { title: 'Farmers Details', component: 'FarmerFullDetailsPage' },
      { title: 'My Transactions', component: 'MyTransactionsPage' },
      { title: 'Benefited Farmers', component: 'BenefittedFarmersPage' },
      { title: 'Contributors List', component: 'ContributorsPage' },
      { title: 'Contact Us', component: 'ContactmePage' },
      { title: 'Rate SaveFarmer', component: HomePage },
      { title: 'Logout', component: LoginPage }
    ];

  }
  openPage(page) {
    this.nav.setRoot(page.component);
    if (page.component == 'ProfilePage') {
      this.profile();
    }


    else if (page.component == 'ContributorsPage') {
      this.overallContribution();
    }
    else if (page.component == 'ContributeFarmersPage') {
      this.bulkTransaction();
    }
    else if (page.component == 'ContactmePage') {
      this.contact();
    }
    else if (page.component == 'MyTransactionsPage') {
      this.myTransaction();
    }
    else if (page.component == 'FarmerFullDetailsPage') {
      this.FarmerFullDetailsPage();
    }
    else if (page.component == 'BenefittedFarmersPage') {
      this.benifttedFarmerPage();
    }
    else if (page.component == LoginPage) {
      this.logout();
    }
  }
  benifttedFarmerPage() {
    this.navCtrl.push('BenefittedFarmersPage');

  }
  FarmerFullDetailsPage() {
    this.navCtrl.push('FarmerFullDetailsPage');
  }
  contact() {
    this.navCtrl.push('ContactmePage');
  }
  myTransaction() {
    this.navCtrl.push('MyTransactionsPage', { mailId: this.mailIdentifier });
  }
  bulkTransaction() {
    this.navCtrl.push('ContributeFarmersPage', { name: this.loggedUserName, mailId: this.mailIdentifier });
  }
  overallContribution() {
    this.navCtrl.push('ContributorsPage', {});
  }
  profile() {
    this.navCtrl.push('ProfilePage', { name: this.loggedUserName, image: this.loggedUserImage, email: this.mailIdentifier, method: this.authMethod });
  }

  fetchFarmers() {
    this.service.fetchFarmerDetails().subscribe(res => {
      //console.log("FFFFFFFF"+res['farmer_details'][0].name);
      this.farmerDetails = res['farmer_details'];
      this.backUpFarmerDetails=this.farmerDetails;
    })
  }
  getItems(searchQueryValue) {
    console.log("summa testing" + searchQueryValue)
    return this.backUpFarmerDetails.filter((item) => {
      return item.name.toLowerCase().indexOf(searchQueryValue.toLowerCase()) > -1;
    });
    
  }
  setFilteredItems() {

    this.farmerDetails = this.getItems(this.searchQuery);

  }
  /**
   * 
   * @param refresher 
   */

  /* getItems(searchbar) {
     var q = searchbar.srcElement.value;
 if (!q) {
       console.log("inside not of q")
       this.flag = false;
       this.infiniteScrollFdetails = [];
       this.infiniteScrollFdetails = this.beforeScroll;
       return;
     }
     if (q.trim()) {
       if (q.val == "") {
         console.log("inside val")
         this.flag = false;
         this.infiniteScrollFdetails = this.backupFdetails;
       }
     }
 
     this.countryList = this.countryList.filter((v) => {
       if (v.name && q) {
         if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
           return true;
         }
         return false;
       }
     });
 
   }*/
  /**
   * 
   * @param refresher 
   */


  doRefresh(refresher) {
    this.searchQuery="";
    this.fetchFarmers();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  logout() {
    if (this.authMethod == 1) {
      this.fireauth.auth.signOut()
        .then(succ => {
          this.navCtrl.setRoot(LoginPage);
        })
        .catch(err => {
        })
    }
    else if (this.authMethod == 2) {
      this.googleplus.logout()
        .then((response) => {
          this.navCtrl.setRoot(LoginPage);
        }, (error) => {
        })
    }
    else if (this.authMethod == 3) {
      this.fb.logout()
        .then((response) => {
          this.navCtrl.setRoot(LoginPage);
        }, (error) => {
        })
    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }

  }
  ngOnInit() {
    console.log("inside init");
    if (this.authMethod == 1) {
      this.mailIdentifier = this.navParams.get('mailId');
      this.loggedUserName = this.navParams.get('name');
    }
    if (3 == this.authMethod || 2 == this.authMethod) {
      this.fbData = this.navParams.get('data');
      this.loggedUserName = this.fbData.uName;
      this.loggedUserImage = this.fbData.image;
      this.mailIdentifier = this.fbData.email;
    }
    this.service.fetchFarmerDetails().subscribe(res => {
      //console.log("sssssssssss"+res['status']);
      this.farmerDetails = res['farmer_details'];
      //console.log(this.farmerDetails);
      this.backUpFarmerDetails=this.farmerDetails;
    })
  }
  farmerDetailsIndividual(value) {
    this.navCtrl.push('IndividualFarmerDetailsPage', {
      method: this.authMethod, itemValue: value, name: this.loggedUserName,
      image: this.loggedUserImage, email: this.mailIdentifier, socialMediaData: this.fbData
    });

  }
  showContributors(index) {
    let contibutorModal = this.modalCtrl.create('ContributorsCountPage', { farmerId: index });
    contibutorModal.present();
  }
}