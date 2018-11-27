import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Platform} from 'ionic-angular';
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
  public unregisterBackButtonAction: any;
  constructor(public platform :Platform, public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
}

ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
}

initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function(event){
        console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
}
  ngOnInit(){
  let date = new Date();
        let techForumDateStart = new Date(2018,12,5);
        techForumDateStart.setHours(10,0,0);
        
        let techForumDateEnd = new Date(2018,12,5);
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

  
