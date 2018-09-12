import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  products = [];
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  getAllTopics() : Observable<any> {
    return this.http.get('assets/allPresenters.json');
  }

  getFeedbacks() : Observable<any> {
    return this.http.get('assets/feedback.json');
  }

  getEmployees() : Observable<any>{
    return  this.http.get('assets/product.json');
  }
}

interface Alltopics {
  id: number;
  name: string;
  description: string;
  roomNumber: string;
  timeSlot: string;
}

interface AllFeedback {
  id : number;
  session : number;
  description: string;
  sessionId : number;
  sessionName :string;
  questionDescription :any;
}



