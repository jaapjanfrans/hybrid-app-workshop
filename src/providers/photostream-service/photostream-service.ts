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
import {User} from "firebase";
import {FileService} from "../file-service/file.service";
import { UUID } from 'angular2-uuid';
import {AngularFireUploadTask} from "angularfire2/storage/task";

/**
 * Inspired by https://angularfirebase.com/lessons/infinite-scroll-firestore-angular/
 */
@Injectable()
export class PhotostreamService {

    // Source data
    private _done = new BehaviorSubject(false);
    private _loading = new BehaviorSubject(false);
    private _data = new BehaviorSubject<PhotostreamImage[]>([]);

    private query: QueryConfig;

    // Observable data
    data: Observable<PhotostreamImage[]>;
    done: Observable<boolean> = this._done.asObservable();
    loading: Observable<boolean> = this._loading.asObservable();


    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,
                public fileService: FileService) {
        this.query = {
            path: 'photostream',
            field: 'dateCreated',
            limit: 10,
            reverse: false,
            prepend: true
        };

        const first = this.afs.collection(this.query.path, ref => {
            return ref
                .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit)
        });

        // Create the observable array for consumption in components
        this.data = this._data.asObservable()
            .scan( (acc, val) => {
                return this.query.prepend ? val.concat(acc) : acc.concat(val)
            })

        // start getting stuff when a user is signed in
        afAuth.user
            .filter((user: User) => user != null)
            .do(() => this.mapAndUpdate(first))
            .subscribe();
    }

    public uploadPicture(fileLocation: string): Observable<AngularFireUploadTask> {
        let uuid = UUID.UUID();
        let storageReference = `/photostream/${uuid}`;

        return this.fileService.set(storageReference, fileLocation);
    }

    // Retrieves additional data from firestore
    public more() {
        const cursor = this.getCursor();

        const more = this.afs.collection(this.query.path, ref => {
            return ref
                .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit)
                .startAfter(cursor)
        });
        this.mapAndUpdate(more)
    }


    // Determines the doc snapshot to paginate query
    private getCursor() {
        const current = this._data.value;
        if (current.length) {
            return this.query.prepend ? current[0].doc : current[current.length - 1].doc
        }
        return null
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

                // If prepending, reverse the batch order
                values = this.query.prepend ? values.reverse() : values;

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