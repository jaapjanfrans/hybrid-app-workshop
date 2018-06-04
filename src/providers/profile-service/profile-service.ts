import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/observable/bindCallback";
import "rxjs-compat/add/operator/first";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/observable/fromEvent";
import {FileService} from "../file-service/file.service";

@Injectable()
export class ProfileService {

  constructor(public fileService: FileService) {}

    /**
     * Uploads a profile picture
     *
     * @param {string} userUid users uid
     * @param {string} localFileLocation location of the local file (full path)
     * @returns {Observable<AngularFireUploadTask>} an uploadtask that can be used to monitor the uploading of the image
     */
  public setProfilePicture(userUid: string, localFileLocation: string): Observable<AngularFireUploadTask> {
      let storageReference: string = `profileimage/${userUid}/profile-1`;

      return this.fileService.set(storageReference, localFileLocation);
  }

    /**
     * Gets the profile picture with the given name for given userUid
     *
     * @param {string} userUid user id
     * @returns {Observable<string>} the local file paths
     */
    public getProfilePicture(userUid: string): Observable<string> {
        let storageReference: string = `profileimage/${userUid}/profile-1`;

        return this.fileService.get(storageReference)
            .catch(error => {
                console.log(`Could not retrieve profileimage: ${error}`);
                return Observable.of(null);
            });
    }
}
