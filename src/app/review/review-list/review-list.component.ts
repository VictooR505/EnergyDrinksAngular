import {ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, catchError, debounce, forkJoin, interval, Observable, of, Subscription} from "rxjs";
import {isEqual} from "lodash";
import {Review, ReviewParams} from "../review";
import {ReviewService} from "../review.service";
import {MatDatepickerIntl, MatDatepickerModule, MatDateRangePicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  providers: [MatDatepickerModule],
})
export class ReviewListComponent {

  public reviews: Review[] = [];
  public selectedSortingOption = {sortBy: 'id', sortOrder: 'ASC'};
  public selectedBrands: string[] = [];
  public selectedFlavours: string[] = [];
  public selectedSugarMin = 0;
  public selectedSugarMax = 75;
  public selectedRatingMin = 0;
  public selectedRatingMax = 10;
  public selectedDateMin = new Date("01-01-2021");
  public selectedDateMax = new Date("01-01-2025");
  public readonly SLIDER_REQUEST_DELAY = 500;

  public reviewsParams: ReviewParams = {...this.selectedSortingOption};

  private readonly subscription = new Subscription();
  private sliderValue$ = new BehaviorSubject<SliderValue>(
    {sugarMin: this.selectedSugarMin, sugarMax: this.selectedSugarMax, ratingMin: this.selectedRatingMin, ratingMax: this.selectedRatingMax}
  );
  private datePickerValue$ = new BehaviorSubject<DatePicker>(
      {dateMin: this.selectedDateMin, dateMax: this.selectedDateMax}
  );

  public filtersData$: Observable<ReviewFiltersData> = this.fetchFiltersData()
    .pipe(
      catchError(() => of<ReviewFiltersData>({brands: [], flavours: []}))
    );

  constructor(
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {

    this.subscription.add(
      this.sliderValue$
        .pipe(
          debounce(() => interval(this.SLIDER_REQUEST_DELAY)),
        )
        .subscribe((sliderValue: SliderValue) => {
          this.reviewsParams = {...this.reviewsParams, ...sliderValue};
          this.fetchDrinksData();
        })
    )

    this.fetchDrinksData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSliderChange(): void {
    // na każdą zmianę w sliderze przekazuj do subjecta zmianę. Wtedy wyemituje kolejną wartość
    this.sliderValue$.next({
      sugarMin: this.selectedSugarMin, // wartości brane z ngModel
      sugarMax: this.selectedSugarMax,
      ratingMin: this.selectedRatingMin,
      ratingMax: this.selectedRatingMax,
    });
  }

  public onDatePickerChange(): void {
    this.datePickerValue$.next({
      dateMin: this.selectedDateMin, // wartości brane z ngModel
      dateMax: this.selectedDateMax,
    });
  }

  public onFiltersChanged(filters: any, filterKey: keyof ReviewParams): void {
    this.reviewsParams[filterKey] = filters;
    this.fetchDrinksData();
  }

  public onSortChanged(selectedSortOption: {sortBy: string, sortOrder: string}): void {
    if (!(selectedSortOption.sortBy && selectedSortOption.sortOrder)) {
      return;
    }
    this.reviewsParams = {...this.reviewsParams, ...selectedSortOption};
    this.fetchDrinksData();
  }

  public compareObjects(object1: Object, object2: Object): boolean {
    return isEqual(object1, object2);
  }

  private fetchDrinksData(): void {
    this.subscription.add(
      this.reviewService.
      getReviews(this.reviewsParams).subscribe((data: Review[]) => {
        this.reviews = data;
        this.cdr.markForCheck();
      })
    );
  }

  private fetchFiltersData(): Observable<ReviewFiltersData> {
    return forkJoin({
      brands: this.reviewService.getBrands(),
      flavours: this.reviewService.getFlavours()
    });
  }
}

type ReviewFiltersData = {
  brands: Array<string>,
  flavours: Array<string>
};

type SliderValue = {
  sugarMin: number,
  sugarMax: number,
  ratingMin: number,
  ratingMax: number
};

type DatePicker = {
  dateMin: Date,
  dateMax: Date
};
