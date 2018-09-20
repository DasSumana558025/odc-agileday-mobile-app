import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PosterImageInterface {
  imageName: string;
  imageDetail: string;
  index?: number;
}

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
})
export class PosterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  images: PosterImageInterface[] = [
    { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 1", index: 0 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 2", index: 1 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 3", index: 2 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 4", index: 3 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 5", index: 4 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 6", index: 5 },
      { imageName: '../../assets/imgs/agileDayLogo.jpg', imageDetail : "test 7", index: 6 }
    ];
 
}
