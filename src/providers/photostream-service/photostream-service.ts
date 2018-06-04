import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Image} from "../../models/image";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";
import {AngularFireAuth} from "angularfire2/auth";
import {default as firebase, User} from "firebase";
import {PaginationService} from "../pagination-service/pagination-service";

/*
  Generated class for the PhotostreamServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotostreamService {

  private photostreamStorageReference: firebase.storage.Reference;

  constructor(public afAuth: AngularFireAuth, afStorage: AngularFireStorage, public paginationService: PaginationService) {
    console.log('Hello PhotostreamServiceProvider Provider');

    this.photostreamStorageReference = afStorage.storage.ref('photostream');
  }

  public getImages(offset: number = 0, size: number = 10): Promise<Image[]> {
    return null;
  }

  public uploadImage(imageLocation: string) {
    this.afAuth.user
        .subscribe((user: User) => {
          // this.photostreamStorageReference.
        });
  }
}
