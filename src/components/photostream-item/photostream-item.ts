import {Component, Input, SimpleChanges} from '@angular/core';
import {PhotostreamImage} from "../../models/photostream-image";
import {Observable} from "rxjs/Observable";
import {PhotostreamService} from "../../providers/photostream-service/photostream-service";
import {FileService} from "../../providers/file-service/file.service";
import {ProfileService} from "../../providers/profile-service/profile-service";

/**
 * Generated class for the PhotostreamItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'photostream-item',
  templateUrl: 'photostream-item.html'
})
export class PhotostreamItemComponent {

  @Input()
  imageRef: string;

  @Input()
  profileUid: string;

  localImageLocation$: Observable<string>;

  profileImageLocation$: Observable<string>;

  constructor(public fileService: FileService, public profileService: ProfileService) {
    console.log('Hello PhotostreamItemComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
      this.localImageLocation$ = this.fileService.get(this.imageRef);
      this.profileImageLocation$ = this.profileService.getProfilePicture(this.profileUid);
  }

}
