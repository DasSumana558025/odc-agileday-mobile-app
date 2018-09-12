import { Component ,ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FeedbackPage } from './../../pages/feedback/feedback';
import { PosterPage } from './../../pages/poster/poster';
import {RegistrationPage} from './../../pages/registration/registration';
import {SessionsPage} from './../../pages/sessions/sessions';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  pageName: string;
  component?: any;
  index?: number;
  icon: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('mycontent') nav: NavController

  rootPage : any = FeedbackPage;

 pages: PageInterface[] = [
    { title: 'Sessions', pageName: 'SessionsPage', component: SessionsPage, index: 0, icon: 'alarm' },
    { title: 'Register', pageName: 'RegisterPage', component: RegistrationPage, index: 1, icon: 'contacts' },
    { title: 'Poster', pageName: 'PosterPage', component: PosterPage, index: 2, icon: 'albums' },
    { title: 'FeedBack', pageName: 'FeedbackPage', component: FeedbackPage, index: 3, icon: 'chatbubbles' }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page) {
    console.log(page.component);
    this.nav.setRoot(page.component);
    
  }

  }
 
  