import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScoreService } from './../services/score.service';
import { SocketService } from '../services/socket.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ScoreService, SocketService],
  bootstrap: [AppComponent]
})

export class AppModule { }
