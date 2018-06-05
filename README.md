# Workshop Hybrid App Development
## 5. Photostream - Sharing is caring
### Goals

* creating a photostream page
* storing photo’s in Firestore Storage and their references in Firestore (db)
* getting photo’s of other people in our stream

### 5.1 Sync profile images to firebase
There are a few new services added to the project in this branch. We will use one of them to sync our profile image to firestore: `ProfileService`. If you open up you can see that this service is a mere wrapper for the `FileService`. It determines a name for our profile picture and uses the `FileService` to retrieve it. Same goes for getting a profilepicture.

the `FileService` will retrieve and store files both locally and in the firebase storage. The device's own storage will serve as a cache for files so we only download a file once.

Study the `takeProfilePicture` method in `ProfilePage`. It now takes the latest userid and the camera picture location and uses them to save the picture with the profilePage.

Adjust `takeProfilePicture` to save the pictureprofile using the `ProfileService`.
Adjust the `ionViewDidload` to get the profilepicture from the `ProfileService`.

### 5.1 Create a photostream page
Create a page that will hold the photostream items and use our (to be created) photostream service to retrieve photo's.

### 5.2 Create a photostream-item component to display an image
Create a photostream-item component and add an `@input()` member variable `imageLocation` of type `string` and an `@input()` variable `author` of type `string`.

### 5.3 create a FAB for taking a picture

### 5.4 create a PhotostreamService
