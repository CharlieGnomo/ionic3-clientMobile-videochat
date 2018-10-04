import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { HomePage } from '../pages/home/home';
import { Diagnostic } from '@ionic-native/diagnostic';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private androidPermissions: AndroidPermissions, private diagnostic: Diagnostic) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let perms = [this.diagnostic.permission.CAMERA, this.diagnostic.permission.RECORD_AUDIO];
      //perms.concat(this.diagnostic.permissionGroups.CAMERA,this.diagnostic.permissionGroups.MICROPHONE)
      this.diagnostic.requestRuntimePermissions(perms).then(console.log).catch(console.error);
      //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS]);
    });
  }
}

