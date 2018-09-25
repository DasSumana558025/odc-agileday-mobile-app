
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
import { AgendaPage } from '../pages/agenda/agenda';
import { AttendancePage } from '../pages/attendance/attendance';
import { FeedbackPage } from '../pages/feedback/feedback';
import { PosterPage } from '../pages/poster/poster';
import { LogoutPage } from '../pages/logout/logout';
import { RegistrationPage } from '../pages/registration/registration';
import { SessionsPage } from '../pages/sessions/sessions';
import { ApiProvider } from '../providers/api/api';
import { FilterPipe} from './filter.pipe';
import { ServicesProvider } from '../providers/services/services';
import { ConfirmationModalModule } from 'ng-confirmation-modal';
import { FlashMessagesModule } from 'ngx-flash-messages';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    AgendaPage,
    SessionsPage,
    FeedbackPage,
    PosterPage,
    AttendancePage,
    RegistrationPage,
    LogoutPage,
    FilterPipe

  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,FlashMessagesModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(MyApp),
    ConfirmationModalModule.forRoot({
      })
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SessionsPage,
    HomePage,
    AgendaPage,
    FeedbackPage,
    PosterPage,
    AttendancePage,
    LogoutPage,
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
