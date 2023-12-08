import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Drink } from "./drink";

@Injectable({
  providedIn: 'root'
})
// ja bym nazwał może DrinkApiService, chyba że planujesz tutaj robić jakieś logiki dodatkowe
export class DrinkService {
  private readonly apiUrl = 'http://localhost:8080/drinks';

  constructor(private http: HttpClient) {}

  getAllDrinks(sortingOption: {sortBy: string, sortOrder: string}): Observable<Drink[]> {
    const options = sortingOption ?
    { params: new HttpParams()
      .set('sortBy', sortingOption.sortBy)
      .set('sortOrder', sortingOption.sortOrder)
    } : {};

    return this.http.get<Drink[]>(this.apiUrl, options);
  }

/*  getFilterDrinks(filterOption: {brands: string[], flavours: string[], sugarMin: number, sugarMax: number}): Observable<Drink[]> {
    const options = filterOption ?
      { params: new HttpParams()
          .set('brand', filterOption.brands.join(','))
          .set('flavour', filterOption.flavours.join(','))
          .set('sugarMax', filterOption.sugarMax)
          .set('sugarMin', filterOption.sugarMin)
      } : {};

    return this.http.get<Drink[]>(this.apiUrl, options);
  }*/

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  getFlavours(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flavours`);
  }
}
