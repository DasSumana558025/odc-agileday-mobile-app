import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Events } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import 'rxjs/add/operator/map';

/**
 * Generated class for the PosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
  
})
export class AgendaPage implements OnInit {
  topics: any[];
  timeSlotSpecificTopics:any[] = [];
  filterValues = ['11:00 To 11:15','11:15 To 12:15','12:15 To 13:15','13.15 to 14.15','14:15 To 15:15','15:15 To 16:15','16:15 To 16:45'];
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,public events: Events) {
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
      }
      for(var i=0;i<this.filterValues.length;i++){
        let sessions = this.topics.filter(x=> x.timeSlot == this.filterValues[i]);
        if(sessions != undefined && sessions.length == 0){
          this.timeSlotSpecificTopics.push({"timeSlot":this.filterValues[i],"room1": 'Lunch Break'});
        }
        else if(sessions.length == 1)
        {
          this.timeSlotSpecificTopics.push({"timeSlot":this.filterValues[i],"room1": sessions[0].description,
                                        "room1Presenter":sessions[0].presenterName});
        }
        else if(sessions.length >1){
          this.timeSlotSpecificTopics.push({"timeSlot":this.filterValues[i],"room1": sessions[0].description,
                                        "room1Presenter":sessions[0].presenterName,"room2":sessions[1].description,
                                        "room2Presenter":sessions[1].presenterName});
        }
        
      }
      console.log(this.timeSlotSpecificTopics);
     
  });
  }
}
