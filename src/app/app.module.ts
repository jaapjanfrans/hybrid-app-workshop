import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfilePage} from "../pages/profile/profile";

import { Camera } from '@ionic-native/camera';
import { CameraService } from '../providers/camera-service/camera-service';
import {IonicStorageModule} from "@ionic/storage";

import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from './firebase-config';
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {ProfilePageModule} from "../pages/profile/profile.module";

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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraService
  ]
})
export class AppModule {}
