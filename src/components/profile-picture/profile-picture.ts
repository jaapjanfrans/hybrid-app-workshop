import {Component, Input} from '@angular/core';

/**
 * Generated class for the ProfilePictureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-picture',
  templateUrl: 'profile-picture.html'
})
export class ProfilePictureComponent {

    @Input()
    image: string;

  constructor() {
  }

}
