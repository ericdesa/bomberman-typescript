import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScoreService } from './../services/score.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})

export class AppModule { }
