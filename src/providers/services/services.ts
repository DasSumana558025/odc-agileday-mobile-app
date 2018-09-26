import { Http ,RequestOptions,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as constants from '../constant/constants';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  products = [];
  userIdAuth = '';
  xAuthToken = '';
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
    this.userIdAuth = localStorage.getItem("X-Auth-UserId");
    this.xAuthToken = localStorage.getItem("X-Auth-Token");
   
  }

  getAllTopics() : Observable<any> {
    
    let header = new Headers();
    header.set('Access-Control-Allow-Origin','*');
    header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    header.set('Accept' ,'application/json');
    header.set('X-Auth-UserId', this.userIdAuth);
    header.set('X-Auth-Token', this.xAuthToken);
    let options = new RequestOptions({headers: header});
    return this.http.get(constants.API_URL+"topics",options);
  }

  getFeedbacks() : Observable<any> {
    
    return this.http.get('assets/feedback.json');
  }

  getUser():Observable<any> {
    let data = localStorage.getItem('auth_token');
    data = "Basic "+ data;
    console.log(data);
    let header = new Headers();
    header.set('Access-Control-Allow-Origin','*');
    header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    header.set('Accept' ,'application/json');
    header.set('Authorization', data);
    let options = new RequestOptions({headers: header});
      return this.http.post(constants.API_URL + 'auth','test', options);;
    };

    postUserVote(param:any) : Observable<any> {
      console.log("Inside uservote()..");
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
      let options = new RequestOptions({headers: header});
      return this.http.post(constants.API_URL +'vote/',param, options)
    }

    getRegisteredTopicForUser(param:any):Observable<any>{

      return this.http.get(constants.API_URL +'topics/user/'+ param);
    }

    registerUserForTopic(param1:any,param2:any):Observable<any>{
      console.log(constants.API_URL +"topics/" + param1 + "/registerUser/" + param2);
      return this.http.put(constants.API_URL +"topics/" + param1 + "/registerUser/" + param2,'test');
      
    }

    unRegisterUserForTopic(param1:any,param2:any):Observable<any>{
      console.log(constants.API_URL +"topics/" + param1 + "/unRegisterUser/" + param2);
      return this.http.put(constants.API_URL +"topics/" + param1 + "/unRegisterUser/" + param2,'test');
      
    }

    attendenceUser(attendenceData:any):Observable<any>{
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('Content-Type' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
      let options = new RequestOptions({headers: header});
      return this.http.post(constants.API_URL +"attendance",attendenceData,options);
    }

    getPosters():Observable<any>{
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
      let options = new RequestOptions({headers: header});
      return this.http.get(constants.API_URL +'posters',options);
    }

    postUserVoteForVideo(param:any) : Observable<any> {
      console.log("Inside uservote()..");
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
     let options = new RequestOptions({headers: header});
          return this.http.post(constants.API_URL +'vote',param, options)
    }

    getPosterUserVote() : Observable<any>{
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
     let options = new RequestOptions({headers: header});
      return this.http.get(constants.API_URL +'vote/stats/' + "POSTER",options);
    }

    getVideoUserVote() : Observable<any>{
      let header = new Headers();
      header.set('Access-Control-Allow-Origin','*');
      header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      header.set('Accept' ,'application/json');
      header.set('X-Auth-UserId', this.userIdAuth);
      header.set('X-Auth-Token', this.xAuthToken);
     let options = new RequestOptions({headers: header});
      return this.http.get(constants.API_URL +'vote/stats/' + "VIDEO",options);
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

interface User {
  id: number,
  userId: string,
  firstName: string,
  lastName: string,
  location: string,
  email: string,
  mobile:string
}

interface Vote{
  id : number,
  topicId : number,
  userId : string,
  voteType : string
}

