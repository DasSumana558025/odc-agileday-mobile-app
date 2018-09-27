import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { FlashMessagesService } from 'ngx-flash-messages';

/**
 * Generated class for the PosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PosterImageInterface {
  imageName: string;
  imageDetail: string;
  index?: number;
}

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
 
  })
export class PosterPage implements OnInit  {
  posters: Poster[];
  display='none';
  selectedPosterUrl = '';
  selectedPosterName = '';
  confirmationMsg = 'By voting for this poster,your earlier vote will be unregistered,are your sure you want to proceed.';
  isAgileDay = false;
  posterDetail: Vote[];
  currPosterVote = false;
  currPostVoteId = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider : ServicesProvider,private alertCtrl: AlertController) {
  }

  
  ngOnInit(){
    this.apiProvider.getPosters().subscribe(data => {
      this.posters = data.json() as Poster[];
      console.log("test posters = "+this.posters[1].url);
    });

    
    this.apiProvider.getPosterUserVote().subscribe(data => {
      this.posterDetail = data.json() as Vote[];
      if(this.posterDetail.length != 0){
        this.currPostVoteId = this.posterDetail[0].posterId;
      }
      
      console.log("test posters = "+JSON.stringify(data.json()) + "vote id = "+this.currPostVoteId);
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
            this.isAgileDay = true;
        } else {
           this.isAgileDay = false;
        }
         
      console.log("test this.isAgileDay = "+ this.isAgileDay);
      
  }
  
  openModalDialog(currPoster,currPosterName){
    this.display='block'; //Set block css
    this.selectedPosterUrl = currPoster;
    this.selectedPosterName = currPosterName;
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
      postVote(currPosterId)
      {
        let strUserId = localStorage.getItem('user_id');
        let userVoteDetail = { "posterId" : currPosterId, userId : strUserId, voteType : "POSTER"} ;
        this.apiProvider.postUserVote(userVoteDetail).subscribe(data => {
        console.log("Inside submit login");
        
          if(data.status == 200){
          // this.showSuccess("Attendence captured sucessfully");
           console.log("vote post sucessfully...");
          }
          else{
           // this.showError("Sorry,Attendence cant be captured");
             console.log("fail during post...");
          }     
              
           }), err => {
          console.log(err);
          this.navCtrl.setRoot(PosterPage);
           }
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
      
      confirmed(currPosterId) {
        this.postVote(currPosterId);
        this.navCtrl.setRoot(PosterPage);
        this.showSuccess("you are vote is sucessfully post.");
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
      
      cancelled() {
       console.log('cancelled');
      }
    
      checkPosterVoteId(postId){
        this.currPosterVote = false;
        if(this.currPostVoteId == postId){
         this.currPosterVote = true;
        }
        console.log("test currPosterVote = "+this.currPosterVote);
        return this.currPosterVote;
      }
      

 
}
interface Poster{
  id : number,
  name : string,
  participants : string,
  url : string,
  }

interface Vote{
  posterId:number,
  totalVotes:number
}