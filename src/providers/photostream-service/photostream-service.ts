import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {QueryConfig} from "../../models/query-config";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {PhotostreamImage} from "../../models/photostream-image";
import {AngularFireAuth} from "angularfire2/auth";
import {FileService} from "../file-service/file.service";
import { UUID } from 'angular2-uuid';
import {Reference, UploadTaskSnapshot} from "angularfire2/storage/interfaces";
import { combineLatest } from 'rxjs'
import {default as firebase, User} from "firebase";
import FieldValue = firebase.firestore.FieldValue;
import {AngularFireUploadTask} from "angularfire2/storage";

/**
 * pagination Inspired by https://angularfirebase.com/lessons/infinite-scroll-firestore-angular/
 */
@Injectable()
export class PhotostreamService {

    private uid$: Observable<string>;

    // Source data
    private _done = new BehaviorSubject(false);
    private _loading = new BehaviorSubject(false);
    private _data = new BehaviorSubject<PhotostreamImage[]>([]);

    private query: QueryConfig = {
        path: 'photostream',
        field: 'timestamp',
        limit: 10
     };

    // Observable data
    data: Observable<PhotostreamImage[]>;
    done: Observable<boolean>;
    loading: Observable<boolean>;

    first: AngularFirestoreCollection ;

    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,
                public fileService: FileService) {
        this.uid$ = this.afAuth.user
            .filter((user: User) => user != null)
            .map((user: User) => user.uid);
    }

    public init(reloadData: boolean = true) {

        this._done = new BehaviorSubject(false);
        this._loading = new BehaviorSubject(false);

        if (reloadData)
        {
            this._data = new BehaviorSubject<PhotostreamImage[]>([]);
            this.data = this._data.asObservable()
                .scan((acc, val) => {
                    return val.concat(acc);
                });
        }

        this.done = this._done.asObservable();
        this.loading = this._loading.asObservable();


        this.first = this.afs.collection(this.query.path, ref => {
            return ref
                .orderBy(this.query.field, 'desc')
                .limit(this.query.limit)
        });

        this.mapAndUpdate(this.first);
    }

    public uploadPicture(fileLocation: string): Observable<any> {
        let uuid = UUID.UUID();
        let storageReference = `/photostream/${uuid}`;

        return combineLatest(this.uid$, this.fileService.set(storageReference, fileLocation))
            .flatMap((results: any[]) => {
                let uid = results[0];
                let uploadTask: AngularFireUploadTask = results[1];

                 return uploadTask.snapshotChanges()
                    .map((uploadSnapshot: UploadTaskSnapshot) => uploadSnapshot.ref)
                    .last()
                    .map((reference: Reference) => {
                       return this.afs.collection('photostream')
                            .doc(uuid)
                            .set({
                                uid:uid,
                                imageRef: reference.fullPath,
                                timestamp: Date.now(),
                            })
                    });
            });
    }

    // Retrieves additional data from firestore
    public more() {
        const more = this.afs.collection(this.query.path, ref => {
            return ref
                .orderBy(this.query.field, 'desc')
                .limit(this.query.limit)
                .startAfter(this._data.value[this._data.value.length - 1].doc)
        });

        this.mapAndUpdate(more)
    }


    // Maps the snapshot to usable format the updates source
    private mapAndUpdate(col: AngularFirestoreCollection<any>) {

        if (this._done.value || this._loading.value) { return }

        // loading
        this._loading.next(true);

        // Map snapshot with doc ref (needed for cursor)
        return col.snapshotChanges()
            .do(arr => {
                let values = arr.map(snap => {
                    const data = snap.payload.doc.data() as PhotostreamImage;
                    const doc = snap.payload.doc;
                    return { ...data, doc }
                });

                // update source with new values, done loading
                this._data.next(values);
                this._loading.next(false);

                // no more values, mark done
                if (!values.length) {
                    this._done.next(true)
                }
            })
            .take(1)
            .subscribe()
    }
}