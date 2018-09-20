import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServicesProvider } from './../../providers/services/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http  } from '@angular/http';

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
export class LoginPage {
  encriptDaseId : string;
  encriptPass : string;
  model : any = {};

  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }

  onSubmit()
  {
  this.encriptDaseId =  btoa(this.model.dasid + ":" + this.model.pwd);
 
  this.http.post('http://localhost:9000/api/auth', {
        //  headers: new HttpHeaders().set({'Access-Control-Allow-Origin' : '*' ,
        //  'Authorization ':  this.encriptDaseId});
         headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
         // 'Access-Control-Allow-Methods' :'POST, GET, OPTIONS, PUT',
          'Accept' : 'application/json',
          'content-type' : 'application/json',
          'Authorization': this.encriptDaseId
        })
  })
  .subscribe(
    result => {
      console.log("Result = "+result);
    },
    err => {
      console.log("Error- something is wrong!")
});
    console.log(this.model.dasid + " encriptDaseId = "+this.encriptDaseId );
    this.navCtrl.setRoot(HomePage);
  }
  
  
}

