import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './../../app/filter.pipe';
import { ServicesProvider } from './../../providers/services/services';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage implements OnInit {

  public alltopics : Alltopics [];

  filterValues = ["TR01","TR02","TR03","TR04"];

  public roomNumber : string = "showAll";

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider) {
  }

  ngOnInit(){
    this.apiProvider.getAllTopics().subscribe(data => {
      this.alltopics = data.json() as Alltopics[];
      console.log(this.alltopics);
    });
    
  }

}

interface Alltopics {
  id: number;
  name: string;
  description: string;
  roomNumber: string;
  timeSlot: string;
}

