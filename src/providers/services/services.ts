import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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

  getEmployees() {
    this.http.get('assets/product.json').subscribe(data => {
      console.log(data);
    })
  }

  getAllTopics() : Observable<any> {
    return this.http.get('assets/allPresenters.json');
  }

  getFeedbacks() : Observable<any> {
    return this.http.get('assets/feedback.json');
  }

}


