# Workshop Hybrid App Development
## 1. Scaffolding our app
### Goals
* Creating the base of our app
* Running the app in chrome
* adding a cordova platform
* running  the app on a device
* adding icon and splashscreen resources

### 1.1 Creating  the base of our app
Open up a termina / cmd screen and go to a nice folder on your machine. Use the ionic cli to create a new application and name it ‘InstaClone’. Choose the `sidemenu` template. Say no to any questions asked during creation of your new app.
### 1.2 Running the app in chrome
Use the ionic CLI to run your app in a local webserver and view it in chrome. Explore the contents of the running app using the dev tools. Try to set a breakpoint via the dev tools in the typescript code and see if debugging works `

### 1.3 Adding a platform
Add the cordova android platform using the ionic cli. It should results in a new folder platforms in the root dir of your app, containing an android folder

### 1.4 Running the app on a device
Use the cli to run your app on a connected android device via usb. Use remote debug in chrome to connect to the running app on the device and notice how you can use this to debug the app on a real device. Use livereload to be able to see live code changes on your device.

### 1.5 Adding an icon and a splashscreen
What is an app without an icon an splashscreen? copy the resources found in this branch in the `resources` folder into a `resources` folder in your new project. Try and find out how to auto create resources using the ionic cli. Run your app on your device to try it out.
