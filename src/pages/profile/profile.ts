import {Component} from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {CameraService} from "../../providers/camera-service/camera-service";
import { Storage } from '@ionic/storage';
import {AngularFireAuth} from "angularfire2/auth";
import { User} from "firebase";
import {ProfileService} from "../../providers/profile-service/profile-service";

import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/take";
import {Observable} from "rxjs";
import "rxjs-compat/add/operator/mergeMap";
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
  profilePictureLocation: Promise<string>;

  constructor(public cameraService: CameraService, public storage: Storage,
              public afAuth: AngularFireAuth, public profileService: ProfileService) {
      this.userUid$ = afAuth.user
          .map((user: User) => user.uid);
  }

  public takeProfilePicture() {
      this.profilePictureLocation = this.cameraService.takePicture()
        .then((imageLocation: string) => {
            this.userUid$
                .take(1)
                .flatMap((uid: string) => this.profileService.uploadProfilePicture('profilepicture-1', uid, imageLocation))
                .subscribe();

          this.storage.set('profilePicture', imageLocation);
          return imageLocation;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profilePictureLocation = this.storage.get('profilePicture');
  }

  ionViewCanEnter(): Promise<boolean> {
      return this.afAuth.user
          .map((user: User) => user != null)
          .take(1)
          .toPromise();

  }
}
