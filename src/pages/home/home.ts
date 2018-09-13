import { Component ,ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FeedbackPage } from './../../pages/feedback/feedback';
import { PosterPage } from './../../pages/poster/poster';
import { AgendaPage } from './../../pages/agenda/agenda';
import { AttendancePage } from './../../pages/attendance/attendance';
import { LogoutPage} from './../../pages/logout/logout';
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

  rootPage : any = AgendaPage;

 pages: PageInterface[] = [
  { title: 'Agenda', pageName: 'AgendaPage', component: AgendaPage, index: 0, icon: 'alarm' },
    { title: 'Session Registration', pageName: 'SessionsPage', component: SessionsPage, index: 1, icon: 'create' },
    { title: 'Poster Competition', pageName: 'PosterPage', component: PosterPage, index: 2, icon: 'images' },
    { title: 'Video Competition', pageName: 'RegisterPage', component: RegistrationPage, index: 3, icon: 'videocam' },
    { title: 'Attendence', pageName: 'AttendancePage', component: AttendancePage, index: 4, icon: 'man' },
    { title: 'FeedBack', pageName: 'FeedbackPage', component: FeedbackPage, index: 5, icon: 'text' },
    { title: 'Logout', pageName: 'LogoutPage', component: LogoutPage, index: 6, icon: 'lock' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page) {
    console.log(page.component);
    this.nav.setRoot(page.component);
    
  }

  }
 
  