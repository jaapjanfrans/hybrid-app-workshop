import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireStorage, AngularFireStorageReference} from "angularfire2/storage";
import {AngularFirestore} from "angularfire2/firestore";
import {User} from "firebase";
import {Entry, File, FileEntry, IFile} from '@ionic-native/file';
import {Observable} from "rxjs";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/observable/bindCallback";
import "rxjs-compat/add/operator/first";

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

  private profilePictureRef: AngularFireStorageReference;

  constructor(public afAuth: AngularFireAuth,
              public afStorage: AngularFireStorage,
              public afFirestore: AngularFirestore,
              public file: File) {
    this.profilePictureRef = afStorage.ref('profileimage');
  }

  public uploadProfilePicture(name: string, userUid: string, fileLocation: string): Observable<AngularFireUploadTask> {
      let pictureRef: AngularFireStorageReference = this.profilePictureRef.child(`${userUid}/${name}`);

      return Observable.fromPromise(this.file.resolveLocalFilesystemUrl(fileLocation))
          .first((entry: Entry) => entry.isFile)
          .flatMap((fileEntry: FileEntry) => Observable.bindCallback(fileEntry.file).call(fileEntry))
          // .flatMap((file: IFile) => Observable.fromPromise(this.file.readAsArrayBuffer(this.file.cacheDirectory, file.name)))
          .flatMap((file: IFile) => {
           let buffer: Promise<ArrayBuffer> =   this.file.readAsArrayBuffer(this.file.cacheDirectory, file.name);
           return Observable.fromPromise(buffer);
          })
          .map((arrayBuffer: ArrayBuffer) => {
              return  pictureRef.put([arrayBuffer]);
          });

  }




}
