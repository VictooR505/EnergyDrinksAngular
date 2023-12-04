import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { RouterLink, RouterOutlet } from "@angular/router";
import { DrinkListComponent } from "./drink-list.component";

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
