import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "angularfire2/storage";
import {Entry, FileEntry, File, IFile} from "@ionic-native/file";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import {Observable} from "rxjs";

@Injectable()
export class StorageService {

  private rootPath: string;
  
  constructor( public afStorage: AngularFireStorage, public file: File) {
    this.rootPath = '';
  }

    /**
     * uploads a file to Firebase Storage
     *
     * @param {string} storageFilename how to name the file in frebase storage
     * @param {string} localFile location of the file (full path)
     * @param storageParentPath the parent path where the file will be stored under at firestore storage
     * @returns {Observable<AngularFireUploadTask>} observable that will return the uploadTask that can be used to monitor upload
     */
  public uploadFile(storageFilename: string, localFile: string, storageParentPath: string = this.rootPath): Observable<AngularFireUploadTask> {
      let fileStorageReference: AngularFireStorageReference = this.afStorage.ref(storageParentPath).child(storageFilename);

      return Observable.fromPromise(this.file.resolveLocalFilesystemUrl(localFile))
          .first((entry: Entry) => entry.isFile)
          .flatMap((fileEntry: FileEntry) => Observable.bindCallback(fileEntry.file).call(fileEntry))
          // .map((file: File) => pictureRef.put(file));
          .flatMap((file: IFile) => {
              let fileReader: FileReader = new FileReader();
              fileReader.readAsArrayBuffer(file);

              /* would rather use Observable.onEvent() (see https://rxjs-dev.firebaseapp.com/api/index/fromEvent)
               here to listen for the fileReader load event, but cordova overwrites the standard js FileReader with it's own version
               that has no addeventlistener method so we can't use that here. */
              return Observable.create(observer => {
                  fileReader.onload = (event: Event) => {
                      let imgBlob = new Blob([fileReader.result], {type: file.type});
                      observer.next(imgBlob);
                      observer.complete();
                  }
              });
          })
          .map((blob: Blob) => fileStorageReference.put(blob))
  }
}
