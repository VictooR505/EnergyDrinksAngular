import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { isArray } from "lodash";
import { Observable } from "rxjs";
import { Drink, DrinksParams } from "./drink";

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private readonly apiUrl = 'http://localhost:8080/drinks';

  constructor(private http: HttpClient) {}

  getDrinks(drinksParams: DrinksParams): Observable<Drink[]> {
    let params = new HttpParams();

    for (const [paramKey, paramValue] of Object.entries(drinksParams)) {
      if (isArray(paramValue)) {
        params = params.set(paramKey, paramValue.join(','));
      } else {
        params = params.set(paramKey, paramValue);
      }
    }

    return this.http.get<Drink[]>(this.apiUrl, {params});  // {params} --> {params: params}
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  getFlavours(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flavours`);
  }
}
