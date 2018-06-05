import {Component, ViewChild} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {PhotostreamService} from "../../providers/photostream-service/photostream-service";
import {PhotostreamImage} from "../../models/photostream-image";
import {Observable} from "rxjs";
import {default as firebase, User} from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {CameraService} from "../../providers/camera-service/camera-service";
import {AngularFireUploadTask} from "angularfire2/storage/task";
import {Reference, UploadTaskSnapshot} from "angularfire2/storage/interfaces";
import { finalize } from 'rxjs/operators';
import "rxjs-compat/add/operator/last";
import {FileService} from "../../providers/file-service/file.service";
import "rxjs-compat/add/operator/delay";


/**
 * Generated class for the PhotostreamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-photostream',
    templateUrl: 'photostream.html',
})
export class PhotostreamPage {

    public items$: Observable<PhotostreamImage[]>;

    @ViewChild('infiniteScroll', {read: InfiniteScroll})
    public infiniteScroll: InfiniteScroll;

    @ViewChild('refresher', {read: Refresher})
    public refresher: Refresher;

    constructor(public photostreamService: PhotostreamService,
                public fileService: FileService,
                public afAuth: AngularFireAuth, public cameraService: CameraService) {}

    ionViewDidLoad() {
        this.init();
    }

    ionViewCanEnter(): Promise<boolean> {
        return this.afAuth.user
            .map((user: User) => user != null)
            .take(1)
            .toPromise();
    }

    private init(reloadData: boolean = true) {
        this.photostreamService.init(reloadData);

        this.items$  = this.photostreamService.data
            .map((items: PhotostreamImage[]) => items.sort((a, b) => (b.timestamp - a.timestamp)));

        this.items$.subscribe((items) => {
            this.infiniteScroll.complete();
            this.refresher.complete();
        });

        this.photostreamService.done.subscribe((done: boolean) => {
            this.infiniteScroll.complete();
            this.refresher.complete();
        });
    }

    public doRefresh() {
        this.init();
    }

    public loadMore() {
        this.photostreamService.done
            .take(1)
            .subscribe((isDone: boolean) => {
                if(!isDone){
                    this.photostreamService.more();
                } else {
                    this.infiniteScroll.complete();
                }
            });
    }

    public takePicture() {
        Observable.fromPromise(this.cameraService.takePicture())
            .flatMap((fileLocation: string) => this.photostreamService.uploadPicture(fileLocation))
            .delay(1000)
            .subscribe(() => {
                this.init(false);
            });
    }

    public getPicture(imageRef: string): Observable<string> {
        return this.fileService.get(imageRef);
    }
}
