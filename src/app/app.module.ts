
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,IonicPageModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { FeedbackPage } from '../pages/feedback/feedback';
import { PosterPage } from '../pages/poster/poster';
import { RegistrationPage } from '../pages/registration/registration';
import { SessionsPage } from '../pages/sessions/sessions';
import { ApiProvider } from '../providers/api/api';
import { FilterPipe} from './filter.pipe';
import { ServicesProvider } from '../providers/services/services';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    SessionsPage,
    FeedbackPage,
    PosterPage,
    RegistrationPage,
    FilterPipe

  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SessionsPage,
    HomePage,
    FeedbackPage,
    PosterPage,
    RegistrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FilterPipe,
    ServicesProvider 
  ]
})
export class AppModule {}
