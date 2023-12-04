import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import { ShowDrinkComponent } from './show-drink.component';

@NgModule({
  declarations: [
    ShowDrinkComponent
  ],
    imports: [
        CommonModule,
    ],
  exports:[
    ShowDrinkComponent
  ]
})
export class ShowDrinkModule { }
