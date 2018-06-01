import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Image} from "../../models/image";
import {AngularFireStorage, AngularFireStorageReference} from "angularfire2/storage";
import {AngularFireAuth} from "angularfire2/auth";
import {default as firebase, User} from "firebase";
import { File } from '@ionic-native/file';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

    private profileImageStorageRef: AngularFireStorageReference;


    constructor(public afStorage: AngularFireStorage, public afAuth: AngularFireAuth, public file: File) {
      console.log('Hello ProfileServiceProvider Provider');
      this.profileImageStorageRef = afStorage.ref('profileimage');
    }

  public getProfileImage(uid: string): Promise<Image> {
    return null;
  }

  public setProfileImage(imageLocation: string): void {
    this.afAuth.user
        .take(1)
        .subscribe((user: User) => {
          let profileImageRef: AngularFireStorageReference = this.profileImageStorageRef.child(`${user.uid}/profileimage-1`);
          let image: File = this.file.getFile(imageLocation);
          profileImageRef.put(image);
        });
  }
}
