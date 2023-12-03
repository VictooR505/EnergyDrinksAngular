import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DrinkListComponent} from "./drink-list.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DrinkListComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        MatSelectModule,
        MatSliderModule,
        RouterOutlet,
        FormsModule
    ],
  exports:[
    DrinkListComponent
  ]
})
export class DrinkListModule { }
