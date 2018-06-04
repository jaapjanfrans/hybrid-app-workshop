import {Component, ViewChild} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PhotostreamService} from "../../providers/photostream-service/photostream-service";
import {PhotostreamImage} from "../../models/photostream-image";
import {Observable} from "rxjs";
import {User} from "firebase";
import {AngularFireAuth} from "angularfire2/auth";

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

    constructor(public photostreamService: PhotostreamService,
                public afAuth: AngularFireAuth) {
        this.items$.subscribe(() => {
            this.infiniteScroll.complete()
        })
    }

    ionViewDidload() {
        this.items$  = this.photostreamService.data;
    }

    ionViewCanEnter(): Promise<boolean> {
        return this.afAuth.user
            .map((user: User) => user != null)
            .take(1)
            .toPromise();
    }

    public loadMore() {
        this.photostreamService.more();
    }

}
