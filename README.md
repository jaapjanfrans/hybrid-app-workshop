# Workshop Hybrid App Development
## 3. Using the camera plugin - solution

### 3.1 Installing the cordova camera plugin & ionic native camera plugin
If you follow https://ionicframework.com/docs/native/camera/ as reference, and install the cordova plugin and after that the ionic native camera plugin, you should be good to go. In `app.module.ts` you hav to add the `Camera` provider under the `imports` section.

### 3.2 Create a CameraService
Using `ionic generate` and choosing the option `provider` you can scaffold a new service. It will call it `CameraServiceProvider` if you choose `CameraService` as the name. I like `service` better than provider so that's why I include that word in the providers name and refactor the service name from `CameraServiceProvider` to `CameraService` after creation of the service. personal preference :-)

Take a look at `camera-service.ts` to see the actual service code.

### 3.3 Add a change profile picture button to the profile page
Take a look at the profile page's html file and ts file for the resulting code.

### 3.4 Displaying the picture on the profile page
Take a look at the profile page's html file and ts file for the resulting code.

### 3.5 Storing the profilepicture location
Take a look at the profile page's html file and ts file for the resulting code.
The `app.module.ts` show the storage module being imported.

