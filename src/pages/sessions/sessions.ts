import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './../../app/filter.pipe';
import {Events } from 'ionic-angular';
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
export class SessionsPage implements OnInit{

  topics: any[];

  filterValues = ["PN_TR01","PN_TR02"];

  public roomNumber : string = "showAll";

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider) {
    
  }

  ngOnInit(){
    this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
      this.topics = data;
      for(var i = 0; i < this.topics.length; i++){
        for(var j = 0; j < this.topics[i].presenters.length; j++)
        {
          if(this.topics[i].presenterName === undefined){
            this.topics[i]["presenterName"]= this.topics[i].presenters[j].firstName + " " + this.topics[i].presenters[j].lastName;
          }
          else
          {
            this.topics[i].presenterName = this.topics[i].presenterName + " , " + this.topics[i].presenters[j].firstName + " " + this.topics[i].presenters[j].lastName;
          }
        }
        console.log(this.topics[i].presenterName);
        this.topics[i]["registered"] = 'false';
      }
     
  });
  }
}

