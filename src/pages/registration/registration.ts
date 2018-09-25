import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage implements OnInit {
  isAgileDayVideo = false;
  currVideoVoteId = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }
  ngOnInit(){
    this.apiProvider.getVideoUserVote().subscribe(data => {
      const videoDetail = data.json() as VoteDetail[];
      this.currVideoVoteId = videoDetail[0].videoId;
      console.log("test video = "+JSON.stringify(data.json()) + "vote id = "+this.currVideoVoteId);
    });

  let date = new Date();
        let techForumDateStart = new Date(2018,8,25);
        techForumDateStart.setHours(10,25,0);
        
        let techForumDateEnd = new Date(2018,8,25);
        techForumDateEnd.setHours(17,25,0);

        console.log("test date = "+date);
        console.log("test techForumDateStart = "+techForumDateStart);
        console.log("test techForumDateEnd = "+techForumDateEnd);
        if(date > techForumDateStart && date < techForumDateEnd) {
            this.isAgileDayVideo = true;
        } else {
           this.isAgileDayVideo = false;
        }
        console.log("test isAgileDayVideo = "+this.isAgileDayVideo);
   }
  options: any = {
    confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
   confirmBtnText: 'Confirm',      				//DEFAULT VALUE
   cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
   cancelBtnText: 'Cancel',      				//DEFAULT VALUE
   modalSize: 'lg',      							 //DEFAULT VALUE
   modalClass: '' ,
                    //DEFAULT VALUE
  }
  
  confirmedVideo(currPosterId) {
   this.postVideoVote(currPosterId);
  }
  
  cancelledVideo() {
   console.log('cancelled');
  }

  postVideoVote(currVideoId)
      {
        let strUserId = localStorage.getItem('user_id');
        let userVoteDetail = { "videoId" : currVideoId, userId : strUserId, voteType : "VIDEO"} ;
        this.apiProvider.postUserVoteForVideo(userVoteDetail).subscribe(data => {
        console.log("Inside submit login");
          if(data.status == 200){
            console.log("vote post sucessfully...");
          }
          else{
            console.log("fail during post...");
          }     
              
           }), err => {
          console.log(err);
          
           }
      }

      checkVideoVoteId(postId){
       
        if(this.currVideoVoteId == postId){
        return true;
        }
        console.log("test video = "+postId);
        return false;
      }

}
interface VoteDetail{
  videoId:number,
  totalVotes:number
}