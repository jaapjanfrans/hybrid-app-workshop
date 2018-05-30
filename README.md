# Workshop Hybrid App Development
## 3. Using the camera plugin
### Goals

* installing a cordova plugin
* Creating a provider (=service) 
* using the camera and storage services to take a picture and save it
* displaying our picture on the profilepage


### 3.1 Installing the cordova camera plugin & ionic native camera plugin
use https://ionicframework.com/docs/native/camera/ as reference

Via the cli, install the cordova camera plugin. Notice that the plugin will be added to `config.xml` and `package.json` and that the plugin is added to the `plugins` folder. you can also see the android java code of plugin is added in the android platform at `platforms/android/app/src/main/java/org/apache/cordova/camera`.

After that, install the ionic native camera plugin. Also add it to `app.module.ts`. THis provides you with a nice injectable angular provider we can use in our own camera provider in the next step.

### 3.2 Create a CameraService
use the cli to create a provider called `CameraService`. Inject the camera service from ionic native in it's constructor.
Add a `takePicture` method to the new service. The method should use the camera service from ionic to take a picture. Notice that the ionic service will return you a Promise object because taking a picture is handled as an async operation. We'll return that promise from our own `takePicture` method as well.

Add some default camera options that we'll use if no specific options are passed to the service. Add this const in the `camera-service.ts` file:
```javascript
const defaultOptions: CameraOptions = {
  correctOrientation: true,
  targetWidth: 1280,
  targetHeight: 720
};
```
And add these defaults to the `takePicture` method as the default by adding this argument to it:
`options: CameraOptions = defaultOptions`


### 3.3 Add a change profile picture button to the profile page
in `profile.ts`, add a method `takeProfilePicture`. Inject our new `CameraService` into the constructor of this page. open up `profile.html` and add an ionic button that will call the `takeProfilePicture` method of `profile.ts` (using a click handler).
So now we've got a button calling the `takeProfilePicture` method on click, which in turn calls the `takePicture` method of our `CameraService`. Clicking the button  should open up the camera view of your device. Notice this will only work on your device as the cordova layer is not available when running the app on your machine via `ionic serve`.
(there is a cordova browser platform that you could use to be able to run cordova on your machine and utilize your webcam with it, but i'd rather test the app on a device). 

### 3.4 Displaying the picture on the profile page
So now when you click the button, you can take a picture. but after that, we don't handle the response yet. Let's do two things with it:
* display the photo in the profilepicture component
* save the file reference for future use

To display the picture, we'll need to get the response from our cameraservice and do something with it. so in the `takeProfilePicture` method, save the response coming from the `CameraService` and save it to a member variable of the `ProfilePage` class. for example `profilePictureLocation: Promise<string>;`.

Now the view of the profilepage has access to the variable, in the `profile.html` file replace the static string with a reference to the new variable. Now, you might see... nothing :-) Notice that our `profilePictureLocation` is a Promise object, which means the resulting string will be available somewhere in the future, it's an async operation so at the time of instantiating the view, the string is probably not available. We can solve this by telling angular that the variable is an async one, by using the `async` pipe right after the reference to the variable. Now the input attribute of your profile-picture component should look something like this:
`[image]="profilePictureLocation | async"`

Now after you take a picture, you should see it in the profile page in all it's glory. 

N.B. if you still do not see it, make sure you're not using the `ionic cordova run android` with the `--livereload` flag. Livereload handles serving of the app's contents differently and uses your computer as the source for your apps files. And in doing so, prevents loading of `file://` url's. You will not have this issue when running the app from the device without livereload.

### 3.5 Storing the profilepicture location
When the app will close and restart, it won't know the location of the beautifull picture anymore :'-( 
So let's save that reference after the picture get's taking using ionic's storage module.

Inject the `Storage` provider to the constructor of `profile.ts`. This provider was already added to the project during scaffolding, but you will need to add it to the imports in `app.module.ts` with this line: `IonicStorageModule.forRoot()`.

in the `takeProfilePicture` method of `ProfilePage` class, add a `then` handler to the response of `takePicture` of the camera service and store the file location string with the `set` method of the `Storage` service, with a key value of something like `profilePicture`. Now the location will be stored on the device for future reference.

Now to load the image when the page is visited, we're going to use an ionic lifecycle hook. In the `ProfilePage`,  notice the empty method `ionViewDidLoad`. That's a hook that get's called after the page has been created (once, if a page is cached it won't be called again). So lets add code in that method that get the file location from the `storage` service and saves it to our `profilePictureLocation` member variable. Notice that the `get` method of the `Storage` service also returns a Promise, retrieving data from storage is also asynchronous. As our member variable is of type Promise<string>, this will resolve nicely when the data is retrieved from storage.

