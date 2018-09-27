import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import { PARAMETERS } from '@angular/core/src/util/decorators';

/**
 * Generated class for the PosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  roomNumber : string ;
  code : {} = "Select 4 digit code";
  allRoomNumber = ["Select","PN_TR01","PN_TR02"];
  attendaceActive = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController) {
  }
  ngOnInit(){
  let date = new Date();
        let techForumDateStart = new Date(2018,8,27);
        techForumDateStart.setHours(10,0,0);
        
        let techForumDateEnd = new Date(2018,8,28);
        techForumDateEnd.setHours(18,0,0);

        console.log("test date = "+date);
        console.log("test techForumDateStart = "+techForumDateStart);
        console.log("test techForumDateEnd = "+techForumDateEnd);
        if(date > techForumDateStart && date < techForumDateEnd) {
            this.attendaceActive = true;
        } else {
           this.attendaceActive = false;
        }
      }
  attendence(code){
    code.value="";
    let strUserId = localStorage.getItem('user_id');
    let attendenceData = {"userId":strUserId};
    this.apiProvider.attendenceUser(attendenceData).subscribe(data => {
    console.log(data);;
    if(data.status == 200){
    this.showSuccess("Attendence captured sucessfully");
    }
    else{
      this.showError("Sorry,Attendence cant be captured");
    }
      
    });
  }

  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: text,
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

  
