import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './../../app/filter.pipe';
import {Events } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage implements OnInit{

  topics: any[];
  registedredTopic : any[];
  filterValues = ["PN_TR01","PN_TR02"];
  public roomNumber : string = "showAll";

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController) {
  }

  ngOnInit(){
    let strUserId = localStorage.getItem('user_id');
    this.apiProvider.getRegisteredTopicForUser(strUserId).map(res=>res.json()).subscribe(data => {
      this.registedredTopic=data;
      console.log("this.registedredTopic",this.registedredTopic);
    });

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
        
        if(this.registedredTopic != undefined && this.registedredTopic.length > 0){
          let object =  this.registedredTopic.find(x => x.id == this.topics[i].id );
          if(object !== undefined){
            this.topics[i]["registered"] = 'true';
          }
          else{
            this.topics[i]["registered"] = 'false';
          }
        }
        else
        {
          this.topics[i]["registered"] = 'false';
        }
      }
      this.topics = this.topics.filter(x => x.description != 'Opening Key Notes');
      this.topics = this.topics.filter(x => x.description != 'Closing Notes and Prize Distribution')
    
    });
  }

  register(session){
    console.log("session",session);
    let strUserId = localStorage.getItem('user_id');
    if(this.registedredTopic.length > 0){
      let object =  this.registedredTopic.find(x => x.timeSlot == session.timeSlot );
      if(object !== undefined){
        let alert = this.alertCtrl.create({
          title: 'Fail',
          subTitle: "This timeslot is already booked for another session. Please unregister the registered session and then register it",
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        this.apiProvider.registerUserForTopic(session.id,strUserId).subscribe(data => {
          if(data.status == 200){
            session.registered = 'true';
            this.registedredTopic.push(session);
            console.log(this.registedredTopic);
            this.showSuccess('You have sucessfully registered for " '+  '<span class="alertclass">' +session.description +'</span> "');
          }
          else
          {
            this.showError("Sorry session cant be registered");
          }
        });
       
      }
     }
     else
     {
      this.apiProvider.registerUserForTopic(session.id,strUserId).subscribe(data => {
        if(data.status == 200){
          session.registered = 'true';
          this.registedredTopic.push(session);
          console.log(this.registedredTopic);
          this.showSuccess('You have sucessfully registered for " '+  '<span class="alertclass">' +session.description +'</span> "');
        }
        else
        {
          this.showError("Sorry session cant be registered"); 
        }
       });
     }

  }

  unregister(session){
    let strUserId = localStorage.getItem('user_id');
     this.apiProvider.unRegisterUserForTopic(session.id,strUserId).subscribe(data => {
     if(data.status == 200){
      let object =  this.registedredTopic.find(x => x.id == session.id );
      const index: number = this.registedredTopic.indexOf(object);
        if (index !== -1) {
            this.registedredTopic.splice(index, 1);
        } 
        console.log(this.registedredTopic);
        session.registered='false';
        this.showSuccess('You have sucessfully unregistered for " '+  '<span class="alertclass">' +session.description +'</span> "');
    }
    else
    {
      this.showError("Sorry session can be unregistered");
    }
    });
  }

  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: text,
      cssClass:'customAlert',
      buttons: ['OK']
    });
    alert.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}

