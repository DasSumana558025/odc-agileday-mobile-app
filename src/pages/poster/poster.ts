import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }

  ngOnInit(){
    this.apiProvider.getPosters().subscribe(data => {
      this.posters = data.json() as Poster[];
      console.log("test posters = "+this.posters);
    });
  }
  
  openModalDialog(currPoster){
    this.display='block'; //Set block css
    this.selectedPosterUrl = currPoster;
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
 
}
interface Poster{
  id : number,
  name : string,
  participants : string
  
}