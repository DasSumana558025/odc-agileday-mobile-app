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
  public employee: Employee [];
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }

  onSubmit()
  {
    this.encriptDaseId =  btoa(this.model.dasid + ":" + this.model.pwd);
    localStorage.setItem('auth_token', this.encriptDaseId);
    this.apiProvider.getEmployees().subscribe(data => {
      const parsedJSON = JSON.parse(data);
      const employeeObj: Employee = parsedJSON as Employee; 
     console.log("Inside ContactPage and onInit() = "+ employeeObj);
    this.navCtrl.setRoot(HomePage);
  });
  

}
}

interface Employee {
  id: number,
  userId: string,
  firstName: string,
  lastName: string,
  location: string,
  email: string,
  mobile:string
}

