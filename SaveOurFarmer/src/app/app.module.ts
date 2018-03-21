import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Facebook } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FetchServiceProvider } from '../providers/fetch-service/fetch-service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';
/*var config = {
  apiKey: "AIzaSyCSmHxesrQkapGZJxuml_22ElCEXQGhMlc",
  authDomain: "sfbackup-99b1c.firebaseapp.com",
  databaseURL: "https://sfbackup-99b1c.firebaseio.com",
  projectId: "sfbackup-99b1c",
  storageBucket: "sfbackup-99b1c.appspot.com",
  messagingSenderId: "120166818413"
};*/
var config = {
  apiKey: "AIzaSyBWCalKPy_NFyyRkQ0IJCRVOa8pDB483R4",
  authDomain: "saveourfarmer-v1.firebaseapp.com",
  databaseURL: "https://saveourfarmer-v1.firebaseio.com",
  projectId: "saveourfarmer-v1",
  storageBucket: "",
  messagingSenderId: "286295053668"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FetchServiceProvider,
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
