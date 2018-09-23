import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Events } from 'ionic-angular';
import { ServicesProvider } from './../../providers/services/services';
import 'rxjs/add/operator/map';
/**
 * Generated class for the PosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {
  topics: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider: ServicesProvider,public events: Events) {
  }

  ngOnInit(){
    this.apiProvider.getAllTopics().map(res=>res.json()).subscribe(data => {
      this.topics = data;
      console.log(this.topics);
     
  });
  }
}
