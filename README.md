# Workshop Introduction to Hybrid App Development
## Goal of the workshop
The main goal is to give an introduction to all aspects that come into play when building a hybrid app.
We'll touch these subjects
* Some background info
    * What's a hybrid app?
    * why would you want to build a hybrid app?
    * Alternatives
    * what stack are we going to use in this workshop
* building a hybrid app
    * the ionic cli
    * scaffolding an app
    * connecting it to a backend solution
    * authentication
    * using cordova plugins
    * building the app using a cloud service
    * debugging using the browser and device

## Prerequisites
To be able to participate you'll need the following
* A buddy.
    * We're going to work in pairs on this workshop because it's fun and efficient.
    * We can form pairs during the workshop of course if you're not sure who you'd like to work with
* A laptop (one per pair of developers)
    * All OS'ses are welcome and equal(ish)ly suitable
    * make sure you've got a decent terminal solution if you're on windows
* An android device and a USB cable (one that supports data transfer, not one of those charge-only-quality ones ;-) )
    * to run the app on
    * if you don't have an android device, use a tfe test device
    * make sure developer tools on the device are active
        * https://developer.android.com/studio/debug/dev-options
    * We'll focus on local and android developing. iOS is fun too but a bit trickier to setup so it's out of scope for this workshop
* these software packages
    * Your favorite IDE
        * e.g. idea, visual studio code, brackets, sublime, etc.
    * Google Chrome
        * we'll use it's dev tools to debug in the browser
    * Git
        * to be able to access the demo src code
        * https://git-scm.com/
    * Node.js
        * the CLI tooling uses node and we'll also use node's package manager, npm
        * https://nodejs.org
        * make sure you've got a recent version, preferrably an LTS 8.x.x one
    * Ionic and Cordova
        * Cordova is the bridge layer between our app's code and the device
        * ionic is a framework built on top of angular that forms the base of our app
        * instructions for install: https://ionicframework.com/docs/intro/installation/
    * An adobe account for Phonegap Build
        * to be able to package our app in the cloud
        * https://build.phonegap.com/
    * Phonegap build CLI
        * to create our builds using commandline instead of the pg build website
        * https://github.com/phonegap-build/pgb-cli/
    * Java SDK and android SDK
        * to build an android app locally
        * all in one solution: install android studio: https://developer.android.com/studio/
        * less bloated option: install a java JDK , install android sdk tools and use it's sdk manager to download latest android platform
        
## Verifying your dev environment
If you can run these commands without issue, you're good to go. If something doesn't work out, pay me a visit and we'll sort it out :-)
* `ionic start myApp blank`
    * answer no to adding platforms at this stage
    * ionic pro is not needed, answer no to that one as well
* `cd myApp`
* `ionic serve`
if you can run these steps you can develop locally and view the app in your browser. To be able to build to an android device use these command to test your setup:
* `ionic cordova platform add android`
* `ionic cordova run android`



