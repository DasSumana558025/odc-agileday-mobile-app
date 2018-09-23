import { Component } from '@angular/core';
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
export class PosterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }

  posterPart1: PosterImageInterface[] = [
    { imageName: '../../assets/imgs/posters/1536146737065-f68a8d29-b7e7-4a53-a84c-54a0fd53691d.jpg', imageDetail : "test 1", index: 0 },
      { imageName: '../../assets/imgs/posters/1536146597554-c2527572-95a2-4286-bb1e-35a575fcde67.jpg', imageDetail : "test 2", index: 1 },
      { imageName: '../../assets/imgs/posters/1536146469842-9fdca013-ae62-409e-96e5-ca519d97f89f.jpg', imageDetail : "test 3", index: 2 },
      { imageName: '../../assets/imgs/posters/1536146798663-b66dcdaf-b063-432e-9c4d-6d1a7d10848a.jpg', imageDetail : "test 4", index: 3 }
     ];

    posterPart2: PosterImageInterface[] = [
        { imageName: '../../assets/imgs/posters/1536146700177-a72a5414-9c41-4f79-8e7a-5ea46158f81e.jpg', imageDetail : "test 5", index: 4 },
        { imageName: '../../assets/imgs/posters/1536146666466-d0cecadb-2800-4fb9-9ae0-4e8518442b3a.jpg', imageDetail : "test 6", index: 5 },
        { imageName: '../../assets/imgs/posters/1536146641513-99220e82-ad2b-4f7f-b5f8-d365bbb60a65.jpg', imageDetail : "test 7", index: 6 },
        { imageName: '../../assets/imgs/posters/1536146548353-c6148a3b-9a39-4e30-a21f-45c1a0d6e054.jpg', imageDetail : "test 8", index: 8 }
      ];

      postVote()
      {
        let strUserId = localStorage.getItem('user_id');
        const userVoteDetail = {id : 0, topicId : 0, userId : strUserId, voteType : "POSTER"} ;
        this.apiProvider.postUserVote(userVoteDetail).subscribe(data => {
        console.log("Inside submit login");
        const user = data.json();
          console.log("User ID  = "+ user.id ) ;
          this.navCtrl.setRoot(PosterPage);       
                  
         }), err => {
          console.log(err);
          this.navCtrl.setRoot(PosterPage);
      }
    
        
      }
 
}
interface Vote{
  id : number,
  topicId : number,
  userId : string,
  voteType : string
}