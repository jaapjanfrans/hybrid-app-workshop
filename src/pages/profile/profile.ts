import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CameraService} from "../../providers/camera-service/camera-service";
import { Storage } from '@ionic/storage';
import {AngularFireAuth} from "angularfire2/auth";
import { User} from "firebase";

import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/take";
import {Observable} from "rxjs";
import "rxjs-compat/add/operator/mergeMap";
import { combineLatest } from 'rxjs'
import {ProfileService} from "../../providers/profile-service/profile-service";

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

    userUid$: Observable<string>;
    profilePictureLocation$: Promise<string>;

    constructor(public cameraService: CameraService, public storage: Storage,
                    public afAuth: AngularFireAuth, public profileService: ProfileService) {
        this.userUid$ = afAuth.user
            .filter(user => user != null)
            .map((user: User) => user.uid);
    }

    public takeProfilePicture() {
        let picture$ = this.cameraService.takePicture();
        this.profilePictureLocation$ = picture$;

        combineLatest(this.userUid$, picture$)
            .flatMap((results: any[]) => {
                //results contains the results of the observables combined above
                // use them to set to profile picture using the profile service.

            })
            .subscribe();
    }


  ionViewDidLoad() {
        // get the picture from profileservice
  }

    ionViewCanEnter(): Promise<boolean> {
      return this.afAuth.user
          .map((user: User) => user != null)
          .take(1)
          .toPromise();

  }
}
