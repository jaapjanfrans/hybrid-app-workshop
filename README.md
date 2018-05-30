# Workshop Hybrid App Development
## 2. A profile page
### Goals
* Creating a pages and components
* Tinkering with html/css/js

### 2.1 Adding a page
Use the cli generate command to add a page called `ProfilePage`. Wire it in the `app.module.ts` file. Also hook up the page to the sidemenu of the app. Delete the sidemenu entries for the home and list pages. 

Set the profile page as the default entry page of the app.

Run the app in the browser. notice the profilepage has no menuicon. Add it. Als change the title in the header to `My Profile'

### 2.2 Adding a profile picture 
_you can use the files in the root directory `excersice-2-files` to fill in the html and scss files_

Create a component called `ProfilePicture`. Wire the new `ComponentsModule` in `app.module.ts`. 

Add an member variable `image` to the `ProfilePicture` class and decorate it with `@Input()`. This will enable us to pass an image string to the component.

Now add a `<profile-picture>` tag to the profile page and give it a `[image]` attribute that points to `../../assets/imgs/logo.png`. N.B. You need to escape the string literal with single quotes otherwise angular will expect to be able to use a variable here with the name `../../assets/imgs/logo.png`.


Also add a line below the profile picture with your name (a static string for now). You can use `<ion-row>` and `<ion-col>` tags to put the profile picture and the name in a grid (ionic uses flexbox). also try and figure out how to center the elements on this page.
