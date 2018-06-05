import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "firebase";

/*
  Generated class for the PushServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const options: PushOptions = {
    android: {
    },
    ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
    },
    windows: {},
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    }
};


@Injectable()
export class PushService {
    private pushObject: PushObject = this.push.init(options);


    constructor(public platform: Platform, public push: Push, public afAuth: AngularFireAuth) {}

  public init() {
      this.pushObject = this.push.init(options);

      this.pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      this.pushObject.on('registration').subscribe((registration: any) => {
          this.afAuth.user
              .filter((user: User) => user != null)
              .do(() => {
                  this.pushObject.subscribe('photostream').then(() => {
                      console.log('Subscribed user to photostream topic');
                  });
              })
              .subscribe();

          this.afAuth.user
              .filter((user: User) => user == null)
              .do(() => {
                  this.pushObject.unsubscribe('photostream').then(() => {
                      console.log('Unsubscribed user to photostream topic');
                  });
              })
              .subscribe();

          console.log('Device registered', registration);
      });

      this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  };


}
