# Workshop Hybrid App Development
## 4. Authentication using a MBAAS (firebase)
### Goals

* connecting to our Firebase backend
* Hooking up authentication

### 4.1 When a user logs in, direct to correct page
Put the given files (via slack) in place: 
* the debug keystore
* the firestore config file

run `npm install`, `ionic cordova platform remove android` and `ionic cordova platform add android`.

Open up `app.component.ts` , notice the AngularFireAuth service that is injected in the constructor. complete the code in `initializeApp()` to redirect user based in logged in state.


### 4.2 Add a log out button to the sidemenu
open up `app.html`, add a button that only shows when a user is logged in and that triggers the method `logOut()` 
N.B. add the `| async` pipe to the button's if statement as the `user` is an async, observable member variable.
