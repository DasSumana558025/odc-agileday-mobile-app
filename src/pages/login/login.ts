import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServicesProvider } from './../../providers/services/services';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
 @Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  loading: Loading;
  encriptDaseId : string;
  encriptPass : string;
  model : any = {};
  public employee: User;
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public apiProvider : ServicesProvider,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
    this.model.dasid="";
    this.model.pwd="";
  }


  onSubmit()
  {
    this.showLoading();
    this.encriptDaseId =  btoa(this.model.dasid + ":" + this.model.pwd);
    localStorage.setItem('auth_token', this.encriptDaseId);
    this.apiProvider.getUser().subscribe(data => {
    if(data){
      const user = data.json();
      this.employee = new User(user.id,user.userId,user.firstName,
      user.lastName,user.location,user.email,user.mobile);
      console.log("Inside login = "+  this.employee.userId);
      localStorage.setItem('user_id',this.employee.userId);
      this.navCtrl.setRoot(HomePage);
    }
    else{
      this.showError("Access Denied");
    }
  },
  error => {
    this.showError("Access Denied");
  });
}

 
  //end class
}

class User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  mobile:string

  constructor(id : number,userId: string,
    firstName: string,
    lastName: string,
    location: string,
    email: string,
    mobile:string){
      this.id = id;
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.location = location;
      this.email = email;
      this.mobile = mobile;

  }
}

