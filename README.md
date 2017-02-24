[![Build Status](https://travis-ci.org/mariohmol/brigadistas.svg?branch=master)](https://travis-ci.org/mariohmol/brigadistas)

App that connects civil fire brigades with civil society to fight against the fire.

Here is the web version:

* http://app.brigadistacivil.com.br/

Development enviroment:

* https://brigadistas.herokuapp.com/

# Techs

- [ionic2](ionicframework.com/docs/v2)
- [angular2](angular.io)
- [webpack](webpack.com)

To install:

* `npm install` on root folder
* `npm install` on brigadistacivil folder

In case of typings problems:

* typings install
* npm run install-plugins

There is a imcopatibility between google-maps cordova and Geolocation tracker, to fix it manually change the `platforms/android/project.properties`. The idea is to use version 10.x from google maps `com.google.android.gms:play-services-maps:10.0.0` and
`cordova.system.library.2=com.google.android.gms:play-services-location:10.0.0`.

This configurations is to get the latest version, that would be a 10.x and will work.

```
target=android-25
android.library.reference.1=CordovaLib
cordova.system.library.1=com.google.android.gms:play-services-maps:+
cordova.system.library.2=com.google.android.gms:play-services-location:+
cordova.gradle.include.1=cordova-plugin-mauron85-background-geolocation/brigadistacivil-logtofile.gradle
cordova.system.library.3=com.google.android.gms:play-services-location:+
cordova.system.library.4=com.android.support:support-v4:+
```

To run this app :

* `npm run dev` to run express server on port 8484
* `npm run watch` to keep watching angular2 files
