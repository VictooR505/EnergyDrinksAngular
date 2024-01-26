import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {isArray} from "lodash";
import {Review, ReviewParams} from "./review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly apiUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) {}

  getReviews(reviewParam: ReviewParams): Observable<Review[]> {
    let params = new HttpParams();

    for (const [paramKey, paramValue] of Object.entries(reviewParam)) {
      if (isArray(paramValue)) {
        params = params.set(paramKey, paramValue.join(','));
      } else {
        params = params.set(paramKey, paramValue);
      }
    }

    return this.http.get<Review[]>(this.apiUrl, {params});  // {params} --> {params: params}
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/drinks/brands`);
  }

  getFlavours(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/drinks/flavours`);
  }
}
