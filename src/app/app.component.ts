import { Component } from '@angular/core';
import { Platform, AlertController,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public app:App,public alertCtrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
 
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();                

        if(activeView.name === "FirstPage") {

            if (nav.canGoBack()){ //Can we go back?
                nav.pop();
            } else {
                const alert = this.alertCtrl.create({
                    title: 'App termination',
                    message: 'Do you want to close the app?',
                    buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Application exit prevented!');
                        }
                    },{
                        text: 'Close App',
                        handler: () => {
                            this.platform.exitApp(); // Close this application
                        }
                    }]
                });
                alert.present();
            }
        }
    });
    });
  }
}

