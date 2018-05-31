import { NgModule } from '@angular/core';
import { ProfilePictureComponent } from './profile-picture/profile-picture';
import {IonicModule} from "ionic-angular";
import { GoogleLoginComponent } from './google-login/google-login';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [ProfilePictureComponent,
    GoogleLoginComponent],
	imports: [
		CommonModule,
        IonicModule
	],
	exports: [ProfilePictureComponent,
    GoogleLoginComponent]
})
export class ComponentsModule {}
