# Workshop Hybrid App Development
## 5. Photostream - Sharing is caring - solution
### Goals

### 5.1 Sync profile images to firebase

see `profile.ts` for code solutions.


### 5.2 Adding functionality to the photostreampage
Ionic has docs for the Fab button, ion infinite and ion refresher components. Look those up to see how these elements can be added to your page.

check out `photostream.html` for the code. Notice in `photostream.ts` that instead of handling `complete()` from an event passed to the event handling methods, we're calling complete on the refresher and infinte scroll elements (Who are binded to member variables using a `viewchild` annotation) when we receive items or done signals from the service.

### 5.3 play around with photostream
Just do it(tm)

I noticed the refreshing of items is a bit wonky at the moment. the implementation of the photostream service is not ideal, should be redone in version 1.1 ;-)
