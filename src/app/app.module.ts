import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {IonicStorageModule} from "@ionic/storage";
import {GooglePlus} from "@ionic-native/google-plus";

import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from './firebase-config';
import {LoginPageModule} from "../pages/login/login.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import { CameraService } from '../providers/camera-service/camera-service';
import { ProfileService } from '../providers/profile-service/profile-service';
import { PaginationService } from '../providers/pagination-service/pagination-service';
import { PhotostreamService } from '../providers/photostream-service/photostream-service';
import {AngularFireStorageModule} from "angularfire2/storage";
import { AngularFirestoreModule} from "angularfire2/firestore";
import {PhotostreamPageModule} from "../pages/photostream/photostream.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
      LoginPageModule,
      ProfilePageModule,

      PhotostreamPageModule,
    BrowserModule,
      IonicStorageModule.forRoot(),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireStorageModule,
      AngularFirestoreModule,
      IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    File,
    GooglePlus,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraService,
    PaginationService,
    PhotostreamService,
    ProfileService
  ]
})
export class AppModule {}
