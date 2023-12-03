import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DrinkListComponent} from "./drink/drink-list/drink-list.component";
import {ReviewListComponent} from "./review/review-list/review-list.component";


const routes: Routes = [
  { path: 'drinks', component: DrinkListComponent},
  { path: 'reviews', component: ReviewListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
