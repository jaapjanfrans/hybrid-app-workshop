import {Component, Input} from '@angular/core';
import {PhotostreamImage} from "../../models/photostream-image";

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
  image: PhotostreamImage;

  constructor() {
    console.log('Hello PhotostreamItemComponent Component');
  }

}
