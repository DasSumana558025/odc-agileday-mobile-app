import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  public allFeedback : AllFeedback [];
  feedbackTempReq:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider) {
  }

  ngOnInit(){
    this.apiProvider.getFeedbacks().subscribe(data => {
    this.allFeedback = data.json() as AllFeedback[];
    console.log("Inside ContactPage and onInit() = "+this.allFeedback);
  });
}

submitFeedback() {
  console.log("result = " + JSON.stringify(this.allFeedback));
  let strUserId = localStorage.getItem('user_id');
  
      for(var i = 0; i < this.allFeedback.length; i++){
        let curranswer = "";
        let feedbackReq = {};
        if(this.allFeedback[i].choiceId == "LONG_TEXT"){
          feedbackReq = {"userId" : strUserId, "quetionId" :  this.allFeedback[i].id,
          "text" : this.allFeedback[i].selectedAnswer };
        }else{
          feedbackReq = {"userId" : strUserId, "quetionId" :  this.allFeedback[i].id, "choiceId" : this.allFeedback[i].selectedAnswer,
          };
        }
        
        this.feedbackTempReq.push(feedbackReq);
      }
  console.log("req = "+JSON.stringify(this.feedbackTempReq));
    this.apiProvider.postUserFeedback(this.feedbackTempReq).subscribe(data => {
        console.log("Inside ContactPage and onInit() = "+JSON.stringify(data.json()));
    });
    
  }
}

interface AllFeedback {
  id : number;
  session : number;
  description: string;
  sessionId : number;
  sessionName :string;
  questionDescription :any;
  selectedAnswer :string;
  choiceId:string;
}