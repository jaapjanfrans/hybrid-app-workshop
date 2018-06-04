import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { CameraService } from '../providers/camera-service/camera-service';
import {IonicStorageModule} from "@ionic/storage";

import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from './firebase-config';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPageModule} from "../pages/login/login.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import { ProfileService } from '../providers/profile-service/profile-service';
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {FileService} from "../providers/file-service/file.service";
import {PhotostreamPageModule} from "../pages/photostream/photostream.module";
import {PhotostreamService} from "../providers/photostream-service/photostream-service";

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
      HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    GooglePlus,
    Camera,
    File,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraService,
    ProfileService,
    FileService,
    CameraService,
    PhotostreamService,
    ProfileService
  ]
})
export class AppModule {}
