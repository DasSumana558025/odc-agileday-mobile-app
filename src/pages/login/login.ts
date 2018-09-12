import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
 @Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model : any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSubmit()
  {
    console.log(this.model);
    this.navCtrl.setRoot(HomePage);
  }
  

}
