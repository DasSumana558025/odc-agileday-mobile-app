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
  roomSpecificTopics:any[] = [];

  filterValues = ['11:00 To 11:15','11:15 To 12:15','12:15 To 13:15','13.15 to 14.15','14:15 To 15:15','15:15 To 16:15','16:15 To 16:45'];
  roomNos = ['TR02','TR03'];
  totalRoomNo : string ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,public events: Events) {
  }

  ngOnInit(){
    this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
      this.topics = data;
      this.totalRoomNo = this.roomNos.length.toString();
      for(var i=0;i<this.filterValues.length;i++){
        let sessions = this.topics.filter(x=> x.timeSlot == this.filterValues[i]);
        let roomSpecificTopic = [];
        for(var j=0;j<this.roomNos.length;j++){
          let roomspecificsessions = sessions.find(x=> x.roomNumber == this.roomNos[j]);
		      if(roomspecificsessions !== undefined){
            for(var k = 0; k < roomspecificsessions.presenters.length; k++)
            {
              if(roomspecificsessions.presenterName === undefined){
                roomspecificsessions["presenterName"]= roomspecificsessions.presenters[k].firstName + " " + roomspecificsessions.presenters[k].lastName;
              }
              else
              {
               roomspecificsessions.presenterName = roomspecificsessions.presenterName + " , " + roomspecificsessions.presenters[k].firstName + " " + roomspecificsessions.presenters[k].lastName;
              } 
           }
		        roomSpecificTopic.push({"room":this.roomNos[j],"topic":roomspecificsessions.description,"presentername":roomspecificsessions.presenterName});
		      }
        }
        this.timeSlotSpecificTopics.push({"timeSlot":this.filterValues[i],"roomDetails":roomSpecificTopic});
      }
      console.log(this.timeSlotSpecificTopics);

     
  });
  }
}
