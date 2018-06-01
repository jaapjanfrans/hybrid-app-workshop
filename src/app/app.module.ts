import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfilePage} from "../pages/profile/profile";

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { CameraService } from '../providers/camera-service/camera-service';
import {IonicStorageModule} from "@ionic/storage";

import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from './firebase-config';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import { ProfileService } from '../providers/profile-service/profile-service';
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFirestoreModule} from "angularfire2/firestore";
import { StorageService } from '../providers/storage-service/storage-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
      LoginPageModule,
      ProfilePageModule,
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
    MyApp,
    ProfilePage,
    LoginPage
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
    StorageService
  ]
})
export class AppModule {}
