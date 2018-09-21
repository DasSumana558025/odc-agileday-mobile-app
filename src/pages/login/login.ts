import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServicesProvider } from './../../providers/services/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  encriptDaseId : string;
  encriptPass : string;
  model : any = {};
  public employee: Employee;
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public apiProvider : ServicesProvider) {
  }

  onSubmit()
  {
    this.encriptDaseId =  btoa(this.model.dasid + ":" + this.model.pwd);
    localStorage.setItem('auth_token', this.encriptDaseId);
     this.apiProvider.getEmployees().subscribe(data => {
      console.log("Inside submit login");
    
      console.log("test = "+ JSON.stringify(data.json()));
     
     this.employee = new Employee(data.id,data.userId,data.firstName,data.lastName,data.location,data.email,data.mobile);
      console.log("Inside ContactPage and onInit() = "+ this.employee);
     this.navCtrl.setRoot(HomePage);
     });

    
  }

  //end class
}

class Employee {
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

