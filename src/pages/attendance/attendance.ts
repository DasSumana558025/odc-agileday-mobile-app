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

  allRoomNumber = ["Select","PN_TR01","PN_TR02"];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController) {
  }

  attendence(roomNumber){
    console.log(roomNumber);
    let strUserId = localStorage.getItem('user_id');
    let attendenceData = {"roomNumber":roomNumber,"userId":strUserId};
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

  
