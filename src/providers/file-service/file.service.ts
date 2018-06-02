import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "angularfire2/storage";
import {Entry, FileEntry, File, IFile} from "@ionic-native/file";
import {Storage} from "@ionic/storage";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/fromPromise";
import "rxjs-compat/add/observable/bindCallback";
import "rxjs-compat/add/operator/first";
import "rxjs-compat/add/operator/mergeMap";
import "rxjs-compat/add/operator/map";
import {HttpClient} from "@angular/common/http";
import "rxjs-compat/add/operator/catch";
import "rxjs-compat/add/observable/from";
import "rxjs-compat/add/observable/of";

@Injectable()
export class FileService {
  
  constructor( public afStorage: AngularFireStorage, public file: File, public storage: Storage, public http: HttpClient) {}

    /**
     * Sets the file in two places:
     * - in local storage the reference to the file is stored
     * - the file is uploaded to firebase storage
     *
     * @param {string} storageReference storageReference to use in localstorage and firestore storage
     * @param {string} localFilePath the full path to the local file
     * @returns {Observable<AngularFireUploadTask>} upload task to monitor upload with
     */
    public set(storageReference: string, localFilePath: string): Observable<AngularFireUploadTask> {
      return Observable.fromPromise(this.storage.set(storageReference, localFilePath))
          .flatMap(() => this.uploadFile(storageReference, localFilePath));
    }

    /**
     * Gets the file for given storagereference. If not available in local filesystem, it will be downloaded
     *
     * @param {string} storageReference storage reference
     * @returns {Observable<string>} the local file path
     */
    public get(storageReference: string): Observable<string> {
        return Observable.fromPromise(this.storage.get(storageReference))
            .flatMap((fileLocation: string) => fileLocation ? Observable.of(fileLocation) : this.downloadFile(storageReference))
    }

    /**
     * uploads a file to Firebase Storage
     *
     * @param storageReference
     * @param {string} localFile location of the file (full path)
     * @returns {Observable<AngularFireUploadTask>} observable that will return the uploadTask that can be used to monitor upload
     */
    private uploadFile(storageReference: string, localFile: string ): Observable<AngularFireUploadTask> {
      let fileStorageReference: AngularFireStorageReference = this.afStorage.ref(storageReference);

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
                  fileReader.onload = () => {
                      let imgBlob = new Blob([fileReader.result], {type: file.type});
                      observer.next(imgBlob);
                      observer.complete();
                  }
              });
          })
          .map((blob: Blob) => fileStorageReference.put(blob))
    }

    /**
     * Downloads the file from firestore storage and stores it locally
     *
     * @param {string} storageReference storage reference
     * @returns {Observable<string>} local file path
     */
    private downloadFile(storageReference: string): Observable<string> {
        let fileReference: AngularFireStorageReference = this.afStorage.ref(storageReference);

        return fileReference.getDownloadURL()
            .flatMap((downloadUrl: string) => this.http.get(downloadUrl, {responseType: 'blob'}))
            .flatMap((fileBlob: Blob) => {
                let filenameStartIndex: number = storageReference.lastIndexOf('/') + 1;
                let filename: string = storageReference.substring(filenameStartIndex, storageReference.length);
                let path: string = storageReference.substring(0, filenameStartIndex - 1);
                let directories: string[] = path.split('/');

                return Observable.fromPromise(this.createDirectories(this.file.cacheDirectory, directories.reverse())
                    .then(() => this.file.writeFile(`${this.file.cacheDirectory}${path}/`, filename, fileBlob, {replace: true}))
                );
            })
            .map((fileEntry: FileEntry) => {
                this.storage.set(storageReference, fileEntry.nativeURL);
                return fileEntry.nativeURL;
            });

    }

    /**
     * Helper that creates directories recursively
     *
     * @param {string} path path to create the directory in
     * @param {string[]} directories array of dirs that have to be created
     */
    private createDirectories(path: string, directories: string[]): Promise<void> {
        if(directories.length > 0) {
            let directoryName = directories.pop();
            return this.file.createDir(path, directoryName, true)
                .then(() => this.createDirectories(`${path}${directoryName}/`, directories),
                    (error) => console.log(`Could not create directory '${directoryName}' at path ${path}. Error: ${error}`));
        }

        return Promise.resolve();
    }
}
