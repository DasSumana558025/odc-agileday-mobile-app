import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,Loading} from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})
export class SessionsPage implements OnInit{

  topics: any[] = [];
  registedredTopic : any[] = [];
  filterValues = ["TR02","TR03"];
  public roomNumber : string = "showAll";
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
  }

  ngOnInit(){
    let strUserId = localStorage.getItem('user_id');
    let promise = new Promise((resolve, reject) => {
      this.apiProvider.getRegisteredTopicForUser(strUserId)
        .toPromise()
        .then(
          res => {
             // Success
           this.registedredTopic=(res.json()) as Topics[];
          console.log("this.registedredTopic",this.registedredTopic);

          ///ANOTHER rest CALL///////////////
          this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
            this.topics = data as Topics[];
            console.log( this.topics);
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
                if(object != undefined){
                  this.topics[i].registered = true;
                }
                else{
                  this.topics[i].registered= false;
                }
              }
              else
              {
                this.topics[i]["registered"] = false;
              }
            }
           this.topics = this.topics.filter(x => x.description != 'Opening Key Notes');
           this.topics = this.topics.filter(x => x.description != 'Closing Notes and Prize Distribution')
           
          });
          resolve();
          }
        );
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
        this.showLoading();
        this.apiProvider.registerUserForTopic(session.id,strUserId).subscribe(data => {
          if(data.status == 200){
            session.registered = true;
            this.registedredTopic.push(session);
            console.log(this.registedredTopic);
            this.showSuccess('You have sucessfully registered for " '+  '<span class="alertclass">' +session.description +'</span> "');
          }
          else
          {
            this.showError("Sorry,we are experiencing system issue,please try again after some time");
          }
        },
        error =>{
          this.showError("Sorry,we are experiencing system issue,please try again after some time");
        });
       
      }
     }
     else
     {
      this.showLoading();
      this.apiProvider.registerUserForTopic(session.id,strUserId).subscribe(data => {
        if(data.status == 200){
          session.registered = true;
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
    this.showLoading();
    let strUserId = localStorage.getItem('user_id');
     this.apiProvider.unRegisterUserForTopic(session.id,strUserId).subscribe(data => {
     if(data.status == 200){
      let object =  this.registedredTopic.find(x => x.id == session.id );
      const index: number = this.registedredTopic.indexOf(object);
        if (index !== -1) {
            this.registedredTopic.splice(index, 1);
        } 
        console.log(this.registedredTopic);
        session.registered=false;
        this.showSuccess('You have sucessfully unregistered for " '+  '<span class="alertclass">' +session.description +'</span> "');
    }
    else
    {
      this.showError("Sorry session can be unregistered");
    }
    });
  }

  showSuccess(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: text,
      cssClass:'customAlert',
      buttons: ['OK']
    });
    alert.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
    });
    this.loading.present();
  }
}
 export interface Presenters{
  id: number,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  mobile: string,
  imageUrl: string
 }

 export interface Topics{
  
  presenters: Presenters[],
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  timeSlot: string,
  roomNumber: string,
  presenterName: string,
  registered:boolean
  
 }

