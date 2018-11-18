import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  checkfeedbackVisible = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController) {
  }

  ngOnInit(){
    let strUserId = localStorage.getItem('user_id');
    let questionDetail = { userId : strUserId, questionType : "FEEDBACK"} ;
    this.apiProvider.getFeedbacks(questionDetail).subscribe(data => {
      this.allFeedback = data.json() as AllFeedback[];
      console.log("Inside FeedbackPage and onInit() feedbackForm = "+this.allFeedback);
  });

  let date = new Date();
        let techForumDateStart = new Date(2018,8,28);
        techForumDateStart.setHours(14,0,0);
        
        let techForumDateEnd = new Date(2018,8,28);
        techForumDateEnd.setHours(18,0,0);

        console.log("test date = "+date);
        console.log("test techForumDateStart = "+techForumDateStart);
        console.log("test techForumDateEnd = "+techForumDateEnd);
        if(date > techForumDateStart && date < techForumDateEnd) {
            this.checkfeedbackVisible = true;
        } else {
           this.checkfeedbackVisible = false;
        }
}

submitFeedback() {
 // console.log("result = " + JSON.stringify(this.allFeedback));
  let strUserId = localStorage.getItem('user_id');
  
      for(var i = 0; i < this.allFeedback.length; i++){
        let curranswer = "";
        let feedbackReq = {};
        if(this.allFeedback[i].choiceId == "LONG_TEXT"){
          feedbackReq = {"userId" : strUserId, "questionId" :  this.allFeedback[i].id,
          "text" : this.allFeedback[i].selectedAnswer };
        }else{
          console.log("tempchoice = "+JSON.stringify(this.allFeedback[i]));
          if(this.allFeedback[i].choiceId == "SINGLE_CHOICE"){
            for(var j=0; j<this.allFeedback[i].questionOptions.length;j++){
              let option = this.allFeedback[i].questionOptions[j].value;
              console.log("option = "+option);
              if(option == this.allFeedback[i].selectedAnswer){
                curranswer = this.allFeedback[i].questionOptions[j].optionId;
              }
              console.log("1tempchoice = "+curranswer);
            }
            
           }
           if(this.allFeedback[i].choiceId == "SINGLE_SELECT"){
             curranswer = this.allFeedback[i].selectedAnswer;
           }
          console.log("tempchoice = "+curranswer);
          feedbackReq = {"userId" : strUserId, "questionId" :  this.allFeedback[i].id, "choiceId" : curranswer};
        }
        
        this.feedbackTempReq.push(feedbackReq);
      }
  console.log("req = "+JSON.stringify(this.feedbackTempReq));
     this.apiProvider.postUserFeedback(this.feedbackTempReq).subscribe(data => {
         console.log("Inside ContactPage and onInit() = "+data.status);
         if(data.status == 200){
          this.showSuccess("your feedback is successfully submitted");
          this.navCtrl.setRoot(FeedbackPage);
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
  questionOptions :any[];
}