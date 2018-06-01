import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotostreamPage } from './photostream';

@NgModule({
  declarations: [
    PhotostreamPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotostreamPage),
  ],
})
export class PhotostreamPageModule {}
