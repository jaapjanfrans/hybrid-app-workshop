# Workshop Hybrid App Development
## 5. Photostream - Sharing is caring
### Goals

* creating a photostream page
* storing photo’s in Firestore Storage and their references in Firestore (db)
* getting photo’s of other people in our stream

### 5.1 Sync profile images to firebase
There are a few new services added to the project in this branch. We will use one of them to sync our profile image to firestore: `ProfileService`. If you open up you can see that this service is a mere wrapper for the `FileService`. It determines a name for our profile picture and uses the `FileService` to retrieve it. Same goes for getting a profilepicture.

the `FileService` will retrieve and store files both locally and in the firebase storage. The device's own storage will serve as a cache for files so we only download a file once.

Study the `takeProfilePicture` method in `ProfilePage`. It now takes the userid and the camera picture location and uses them to save the picture with the profilePage.

Adjust `takeProfilePicture`, uncomment the code block and save the pictureprofile using the `ProfileService`.

Fill in the `ionViewDidEnter` meter to get the profilepicture from the `ProfileService` using the `userUid$` observable (hint: use a `flatMap` operator on the `userUid$` observable.

### 5.2 Adding functionality to the photostreampage
The `PhotostreamPage` uses a service to get photostream images and displaying them in a list toghether with the profile picture of the person who took the picture. 

Add these things to the page
* an ionic FAB button with an ionic icon of a camera in the bottom right corner that will call `takePicture` of the profilepage class.
* An infinite scroll component that has an attribute `#infiniteScroll` and calls `loadMore()` on `ionInfinite`
* a refresher component that has an attribute `#refresher` and calls `doRefresh` on `ionRefresh` event.
Create a page that will hold the photostream items and use our (to be created) photostream service to retrieve photo's.

