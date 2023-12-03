import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrinkListComponent } from './drink/drink-list/drink-list.component';
import { DrinkFormComponent } from './drink/drink-form/drink-form.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { ReviewFormComponent } from './review/review-form/review-form.component';
import { ShowDrinkComponent } from './drink/show-drink/show-drink.component';
import { AppRoutingModule } from './app-routing.module';
import {DrinkService} from "./drink/drink.service";
import {ReviewService} from "./review/review.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DrinkListModule} from "./drink/drink-list/drink-list.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DrinkFormComponent,
    ReviewListComponent,
    ReviewFormComponent,
    ShowDrinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    DrinkListModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
