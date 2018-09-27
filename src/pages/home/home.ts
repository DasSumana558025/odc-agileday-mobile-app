import { Component ,ViewChild ,AfterViewInit, OnInit } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FeedbackPage } from './../../pages/feedback/feedback';
import { PosterPage } from './../../pages/poster/poster';
import { AgendaPage } from './../../pages/agenda/agenda';
import { AttendancePage } from './../../pages/attendance/attendance';
import { LogoutPage} from './../../pages/logout/logout';
import {RegistrationPage} from './../../pages/registration/registration';
import {SessionsPage} from './../../pages/sessions/sessions';
import { ServicesProvider } from './../../providers/services/services';
import {LoginPage} from './../login/login';
import 'rxjs/add/operator/map';
import {Events } from 'ionic-angular';

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
export class HomePage implements OnInit {

  @ViewChild('mycontent') nav: NavController
  isAgileDay = false;
  rootPage : any = AgendaPage;

  topics: any[];

 pages: PageInterface[] = [
  { title: 'Agenda', pageName: 'AgendaPage', component: AgendaPage, index: 0, icon: 'alarm' },
    { title: 'Session Registration', pageName: 'SessionsPage', component: SessionsPage, index: 1, icon: 'create' },
    { title: 'Poster Competition', pageName: 'PosterPage', component: PosterPage, index: 2, icon: 'images' },
    { title: 'Video Competition', pageName: 'RegisterPage', component: RegistrationPage, index: 3, icon: 'videocam' },
    { title: 'Attendence', pageName: 'AttendancePage', component: AttendancePage, index: 4, icon: 'man' },
    { title: 'FeedBack', pageName: 'FeedbackPage', component: FeedbackPage, index: 5, icon: 'text' },
    { title: 'Logout', pageName: 'LogoutPage', component: LogoutPage, index: 6, icon: 'lock' }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public apiProvider: ServicesProvider) {

  }

  ngOnInit(){
    //  let date = new Date();
    //  let techForumDateStart = new Date(2018,8,28);
    //  techForumDateStart.setHours(10,0,0);
    
    //  let techForumDateEnd = new Date(2018,8,28);
    //  techForumDateEnd.setHours(18,0,0);

    //  console.log("test date = "+date);
    //  console.log("test techForumDateStart = "+techForumDateStart);
    // console.log("test techForumDateEnd = "+techForumDateEnd);
    //  if(date > techForumDateStart && date < techForumDateEnd) {
    //      this.isAgileDay = true;
    //  } else {
    //    this.isAgileDay = false;
    //  }
    //  if(this.isAgileDay == false){
    //  let object =  this.pages.find(x => x.pageName == 'RegisterPage' );
    // const index: number = this.pages.indexOf(object);
    //    if (index !== -1) {
    //        this.pages.splice(index, 1);
    //    }
    //  }
    // console.log("pages",this.pages);
  }

  openPage(page) {
    if(page.title == "Logout"){
      localStorage.removeItem('X-Auth-UserId');
      localStorage.removeItem('X-Auth-Token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('auth_token');
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    }
    else{
      this.nav.setRoot(page.component);
    }
    
    
  }

  

  // ngOnInit(){
  //   this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
  //     this.topics = data;
  //     console.log("under HomePage",  data);
  // });
  // }
}