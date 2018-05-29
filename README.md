# Workshop Hybrid App Development
## 1. Scaffolding our app - solutions

### 1.1 Creating  the base of our app
The cli has a command `ionic start` that guids you through scaffolding of a new app
### 1.2 Running the app in chrome
to start the app locally on your machine you can use `ionic serve`. After starting
the local webserver using that command you can point your chrome browser to `http://localhost:8100`
In chrome you can open the web developer tools, on the sources tab you can browse all source files. 
Add a breakpoint in a `.ts` file, like `list.ts`, and reload the page to see if you can debug the code.
### 1.3 Adding a platform
The cli has a cordova command that accepts all cordova subcommands. To add android use
`ionic cordova platform add android`.
### 1.4 Running the app on a device
Connect your device, make sure it trusts your computer. then run `ionic cordova run android --livereload` to
run the app on the device with livereload enabled. Livereload not only has the advantage of instant reload of code
but also provides you with sourcemap files so you can debug the `.ts` files instead of a combined `.js` file.
### 1.5 Adding an icon and a splashscreen
The `resources` folder contains an icon and a splashscreen template. Use the cli command `ionic cordova resources` to 
generate all resource formats needed. when you re-run the app on the device you should now see an icon and splashscreen
on startup.
