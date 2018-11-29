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
  locationDetail: AllLocation[];
  //filterValues = ['11:00 To 11:15','11:15 To 12:15','12:15 To 13:15','13.15 to 14.15','14:15 To 15:15','15:15 To 16:15','16:15 To 16:45'];
  filterValues = [];
 // roomNos = ['PNCP_TR01','PNCP_TR02','PNCP_TR03','PNCP_TR04'];
  roomNos = [];
  presentersRoom = [];
  totalRoomNo : string ;
  responseMsg : string;
  isDataAvailable : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,public events: Events) {
  }

  ngOnInit(){
    this.isDataAvailable = false;
  this.getRoomDetails();
   this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
      this.topics = data;
      this.getAllTimeSlot();
      console.log("room - "+JSON.stringify(this.roomNos));
      console.log("presentersRoom - "+JSON.stringify(this.presentersRoom));
      console.log("filterValues - "+JSON.stringify(this.filterValues));
      this.totalRoomNo = this.presentersRoom.length.toString();

      for(var i=0;i<this.filterValues.length;i++){
        let sessions = this.topics.filter(x=> x.timeSlot == this.filterValues[i]);
        let roomSpecificTopic = [];
        for(var j=0;j<this.presentersRoom.length;j++){
          
            let roomspecificsessions = sessions.find(x=> x.roomNumber == this.presentersRoom[j]);
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
              roomSpecificTopic.push({"room":this.presentersRoom[j],"topic":roomspecificsessions.description,"presentername":roomspecificsessions.presenterName});
            }
       
        this.timeSlotSpecificTopics.push({"timeSlot":this.filterValues[i],"roomDetails":roomSpecificTopic});
      }
    }
      console.log("FinalArray - " + JSON.stringify(this.timeSlotSpecificTopics));

     
  });

  
  }

  getAllTimeSlot(){
    if(null != this.topics){
      for(var i=0; i<this.topics.length; i++){
        
        if(this.filterValues.indexOf(this.topics[i].timeSlot) == -1){
          this.filterValues.push(this.topics[i].timeSlot);
        }
        if(this.presentersRoom.indexOf(this.topics[i].roomNumber) == -1){
          this.presentersRoom.push(this.topics[i].roomNumber);
        }
        
      }
    }
  }

  getRoomDetails(){
    var location =  localStorage.getItem("user_location");
    console.log("locationService - "+location);
        this.apiProvider.getRoomDetailsBylocation(location).subscribe(data => {
          this.locationDetail = data.json() as AllLocation[];
          console.log("location Detail() = " + JSON.stringify(this.locationDetail));
          var roomsArray = this.locationDetail["rooms"];

          for(var i=0; i<roomsArray.length; i++)
          {
            var currRoom = {"roomName" :roomsArray[i].name, "roomCode": roomsArray[i].code};
         //   console.log("room - "+currRoom);
            this.roomNos.push(currRoom);
            
          }
          console.log("roomNos - "+JSON.stringify(this.roomNos));
      });

    }

    getRoomNameByCode(code)
    {
        for(var i=0; i<this.roomNos.length; i ++){
          var roomDetail = this.roomNos[i];
          if(roomDetail.roomCode === code){
            return roomDetail.roomName + "- Topic/Speaker";
          }
        }
        return "";
    }
}

interface AllLocation {
  code: string;
  name:string;
 address :string;
 rooms :any[];
}
