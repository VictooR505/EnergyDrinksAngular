import {Component, OnInit} from '@angular/core';
import {DrinkService} from "../drink.service";
import {Drink} from "../drink";

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit{

  drinks?: Drink[];
  min = 10;
  max = 40;
  brands?: string[];
  flavours?: string[];
  selectedSortingOption = "?sortBy=sugar&sortOrder=DESC";
  newValue=""
  constructor(private drinkService: DrinkService) {
  }

  ngOnInit() {
    this.drinkService.getAll(this.selectedSortingOption).subscribe((data:Drink[]) => {
      this.drinks = data;
    });
      this.drinkService.getBrands().subscribe(data => {
      this.brands = data.map(str => str.valueOf());
      });
      this.drinkService.getFlavours().subscribe(data => {
          this.flavours = data.map(str => str.valueOf());
      });
  }

  reSearch(newValue: string){
    this.selectedSortingOption=newValue;
  }




}
