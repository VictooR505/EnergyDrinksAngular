import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkFormComponent } from './drink/drink-form/drink-form.component';
import { DrinkListModule } from "./drink/drink-list/drink-list.module";
import { ShowDrinkModule } from './drink/show-drink/show-drink.module';
import { ReviewFormComponent } from './review/review-form/review-form.component';
import { ReviewListComponent } from './review/review-list/review-list.component';

@NgModule({
  declarations: [
    // Lepiej robić moduły z każdym komponentem - potem wystarczy że do danego modułu dorzucasz ten który Cię interesuje
    // aby go zainjectować. Unikaj wrzucania modułów bezpośrednio do app.module. Zrobiłem Ci na przykładzie ShowDrinkModule.
    AppComponent,
    DrinkFormComponent,
    ReviewListComponent,
    ReviewFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    DrinkListModule,
    BrowserAnimationsModule,
    ShowDrinkModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
