import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { DomSanitizer } from '@angular/platform-browser';

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
  allVideos : Video[];

 
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider : ServicesProvider,private alertCtrl: AlertController,public sanitizer: DomSanitizer) {
  }
  ngOnInit(){
    this.apiProvider.getVideoUserVote().subscribe(data => {
      const videoDetail = data.json() as VoteDetail[];
      console.log("test videoObj = "+JSON.stringify(data.json()));
      if( videoDetail.length != 0){
        this.currVideoVoteId = videoDetail[0].videoId;
      }
        console.log("video vote id = "+this.currVideoVoteId);
    });
    
    this.apiProvider.getAllVideos().subscribe(data => {
        this.allVideos = data.json() as Video[];
        console.log("video list = "+JSON.stringify(data.json()));
    });


  let date = new Date();
        let techForumDateStart = new Date(2018,8,28);
        techForumDateStart.setHours(10,0,0);
        
        let techForumDateEnd = new Date(2018,8,28);
        techForumDateEnd.setHours(18,0,0);

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
  
   getUrlSafe(url){
    console.log("URL" + url);
    let newUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/' + url);
    console.log("newUrl" + newUrl);
    return newUrl;   
  }
  
  confirmedVideo(currPosterId) {
    this.postVideoVote(currPosterId);
    this.showSuccess("you are vote is sucessfully post.");
    this.navCtrl.setRoot(RegistrationPage);
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

interface Video{
  id : number;
  name : string;
  participants : string;
  url : string;
}