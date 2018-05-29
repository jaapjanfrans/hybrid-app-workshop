import { NgModule } from '@angular/core';
import { ProfilePictureComponent } from './profile-picture/profile-picture';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [ProfilePictureComponent],
	imports: [
        IonicModule
	],
	exports: [ProfilePictureComponent]
})
export class ComponentsModule {}
