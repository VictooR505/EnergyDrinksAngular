import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Drink} from "./drink";

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private apiUrl: string;
  constructor(private http:HttpClient) {
    this.apiUrl = 'http://localhost:8080/drinks';
  }

  getAll(sortingOption: string): Observable<Drink[]> {
    const params = new HttpParams().set('sortingOption', sortingOption);
    return this.http.get<Drink[]>(`${this.apiUrl}`+sortingOption);
  }

  getBrands(): Observable<String[]> {
    return this.http.get<string[]>('http://localhost:8080/drinks/brands')
  }

  getFlavours(): Observable<String[]> {
    return this.http.get<string[]>('http://localhost:8080/drinks/flavours')
  }
}
