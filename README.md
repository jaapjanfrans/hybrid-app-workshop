# Workshop Hybrid App Development
## 3. Using the camera plugin
### Goals

* installing a cordova plugin
* Creating a provider (=service) 


### 3.1 Installing the cordova camera plugin & ionic native camera plugin
use https://ionicframework.com/docs/native/camera/ as reference

Via the cli, install the cordova camera plugin. Notice that the plugin will be added to `config.xml` and `package.json` and that the plugin is added to the `plugins` folder. you can also see the android java code of plugin is added in the android platform at `platforms/android/app/src/main/java/org/apache/cordova/camera`.

After that, install the ionic native camera plugin. Also add it to `app.module.ts`. THis provides you with a nice injectable angular provider we can use in our own camera provider in the next step.

### 3.2 Create a CameraService
use the cli to create a provider called `CameraService`. Inject the camera service from ionic native in it's constructor.
Add a `takePicture` method to the new service. The method should use the camera service from ionic to take a picture. Notice that the ionic service will return you a Promise object because taking a picture is handled as an async operation.

### 3.3 Add a change profile picture button to the profile page
in `profile.ts`, add a method `takePicture`. Inject our new `CameraService` into the constructor of this page. open up `profile.html` and add an ionic button that will call the `takePicture` method of `profile.ts` (using a click handler).

Test on a device if the button works.

Now you just need to save the reference to the file delivered in the promise returned from `takePicture`.  
Inject the `Storage` provider to the constructor of `profile.ts`. THis provider was already added to the project during scaffolding, but you will need to add it to the imports in `app.module.ts` with `IonicStorageModule.forRoot()`.
Add a `then` handler to the response of `takePicture` of the camera service and store the reference to the file with a key like `profilePicture`.

Now you just need to load 
