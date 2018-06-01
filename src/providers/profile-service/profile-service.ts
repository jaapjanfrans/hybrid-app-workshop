import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/observable/bindCallback";
import "rxjs-compat/add/operator/first";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/observable/fromEvent";
import {StorageService} from "../storage-service/storage-service";

@Injectable()
export class ProfileService {

  constructor(public storageService: StorageService) {}

    /**
     * Uploads a profile picture
     *
     * @param {string} name name of the profile picture
     * @param {string} userUid users uid
     * @param {string} localFileLocation location of the local file (full path)
     * @returns {Observable<AngularFireUploadTask>} an uploadtask that can be used to monitor the uploading of the image
     */
  public uploadProfilePicture(name: string, userUid: string, localFileLocation: string): Observable<AngularFireUploadTask> {
      let pictureStoragePath: string = `profileimage/${userUid}`;

      return this.storageService.uploadFile(name, localFileLocation, pictureStoragePath);
  }
}
