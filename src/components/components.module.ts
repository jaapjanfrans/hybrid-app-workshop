import { NgModule } from '@angular/core';
import { ProfilePictureComponent } from './profile-picture/profile-picture';
import {IonicModule} from "ionic-angular";
import { GoogleLoginComponent } from './google-login/google-login';
import {CommonModule} from "@angular/common";
import { PhotostreamItemComponent } from './photostream-item/photostream-item';
@NgModule({
	declarations: [ProfilePictureComponent,
    GoogleLoginComponent,
    PhotostreamItemComponent],
	imports: [
		CommonModule,
        IonicModule
	],
	exports: [ProfilePictureComponent,
    GoogleLoginComponent,
    PhotostreamItemComponent]
})
export class ComponentsModule {}
