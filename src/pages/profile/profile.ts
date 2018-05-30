import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CameraService} from "../../providers/camera-service/camera-service";
import { Storage } from '@ionic/storage';
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

  profilePictureLocation: Promise<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraService: CameraService, public storage: Storage) {
  }

  public takePicture() {
      this.profilePictureLocation = this.cameraService.takePicture()
        .then((imageLocation: string) => {
          this.storage.set('profilePicture', imageLocation);
          return imageLocation;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
