import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login/login";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "firebase";
import {Observable} from "rxjs/Observable";
import {PhotostreamPage} from "../pages/photostream/photostream";
import {PushService} from "../providers/push-service/push-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: PhotostreamPage;

  pages: Array<{title: string, component: any}>;

  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public pushService: PushService) {
    this.user = this.afAuth.user;

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Photostream', component: PhotostreamPage },
      { title: 'My Profile', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(()  => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.user.subscribe(user => {
        if(user == null) {
          this.nav.setRoot(LoginPage);
        } else {
          this.nav.setRoot(ProfilePage);
        }
      });

      this.pushService.init();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
