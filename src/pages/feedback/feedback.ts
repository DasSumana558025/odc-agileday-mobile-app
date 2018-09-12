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


  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider) {
  }

  ngOnInit(){
    this.apiProvider.getFeedbacks().subscribe(data => {
    this.allFeedback = data.json() as AllFeedback[];
    console.log("Inside ContactPage and onInit() = "+this.allFeedback);
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
}