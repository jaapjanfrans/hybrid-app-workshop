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
Add a `takePicture` method to the new service. The method should use the camera service from ionic to take a picture. Notice that the ionic service will return you a Promise object because taking a picture is handled as an async operation. We'll return that promise from our own `takePicture` method as well.

### 3.3 Add a change profile picture button to the profile page
in `profile.ts`, add a method `takeProfilePicture`. Inject our new `CameraService` into the constructor of this page. open up `profile.html` and add an ionic button that will call the `takeProfilePicture` method of `profile.ts` (using a click handler).
So now we've got a button calling the `takeProfilePicture` method on click, which in turn calls the `takePicture` method of our `CameraService`. Clicking the button  should open up the camera view of your device. Notice this will only work on your device as the cordova layer is not available when running the app on your machine via `ionic serve`.
(there is a cordova browser platform that you could use to be able to run cordova on your machine and utilize your webcam with it, but i'd rather test the app on a device). 

So now when you click the button, you can take a picture. but after that, we don't handle the response yet. Let's do two things with it:
* display the photo in the profilepicture component
* save the file reference for future use

To display the picture, we'll need to get the response from our cameraservice and do something with it. so in the `takeProfilePicture` method, save the response coming from the `CameraService` and save it to a member variable of the `ProfilePage` class. for example `profilePictureLocation: Promise<string>;`.
Now the view of the profilepage has access to the variable, in the `profile.html` file replace the static string with a reference to the new variable. Now, you might see... nothing. Notice that our `profilePictureLocation` is a Promise object, which means the resulting string will be available somewhere in the future, it's an async operation so at the time of instantiating the view, the string is probably not available. We can solve this by telling angular that the variable is an async one, by using the `async` pipe right after the reference to the variable. Now the input attribute of your profile-picture component should look something like this:
`[image]="profilePictureLocation | async"`



Now you  need to save the reference to the file delivered in the promise returned from `takePicture`.  
Inject the `Storage` provider to the constructor of `profile.ts`. THis provider was already added to the project during scaffolding, but you will need to add it to the imports in `app.module.ts` with `IonicStorageModule.forRoot()`.
Add a `then` handler to the response of `takePicture` of the camera service and store the file location string with the `set` method of the `Storage` service, with a key value of something like `profilePicture`.

So

