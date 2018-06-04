import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotostreamPage } from './photostream';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PhotostreamPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PhotostreamPage),
  ],
})
export class PhotostreamPageModule {}
