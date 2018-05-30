import { Injectable } from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";

/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const defaultOptions: CameraOptions = {
  correctOrientation: true,
  targetWidth: 1280,
  targetHeight: 720
};

@Injectable()
export class CameraService {

  constructor(public camera: Camera) {
    console.log('Hello CameraServiceProvider Provider');
  }

    /**
     * Takes a picture and returns the file location
     *
     * @returns {string} location of the file on the device
     */
  public takePicture(options: CameraOptions = defaultOptions): Promise<string> {
    return this.camera.getPicture(options);
  }
}
