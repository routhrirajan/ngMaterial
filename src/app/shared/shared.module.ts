import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatIconRegistry
       } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';

//import { MomentModule } from 'angular2-moment';
import { NgxWebstorageModule } from 'ngx-webstorage';

import 'hammerjs';

import { AuthenticationModule } from './authentication/authentication.module';
import { Directives} from './directives/';
import { environment } from 'environments/environment';
import { AnimationsService } from './animations/animations.service';
import { CoreModule } from 'app/shared/common/core.module';
import { NotificationMessageComponent } from 'app/notification/notification-message.component';

@NgModule({
  declarations: [
    NotificationMessageComponent,
    ...Directives,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AuthenticationModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //MomentModule,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    NgxWebstorageModule.forRoot(),
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [
    MatIconRegistry,
    AnimationsService,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule,
    //MomentModule,
    NgxWebstorageModule,
    NotificationMessageComponent,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    ...Directives,
  ],
})

export class SharedModule { }
