import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { BehaviorSubject, Observable, Subscription, catchError, debounce, forkJoin, interval, of } from 'rxjs';
import { Drink, DrinksParams } from "../drink";
import { DrinkService } from "../drink.service";

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinkListComponent implements OnInit, OnDestroy {

  public drinks: Drink[] = [];
  public selectedSortingOption = {sortBy: 'id', sortOrder: 'ASC'};
  public selectedBrands: string[] = [];
  public selectedFlavours: string[] = [];
  public selectedSugarMin = 0;
  public selectedSugarMax = 75;
  public readonly SLIDER_REQUEST_DELAY = 500;

  public drinksParams: DrinksParams = {...this.selectedSortingOption};

  private readonly subscription = new Subscription();
  private sliderValue$ = new BehaviorSubject<SliderValue>(
    {sugarMin: this.selectedSugarMin, sugarMax: this.selectedSugarMax}
  );

  public filtersData$: Observable<DrinksFiltersData> = this.fetchFiltersData()
    .pipe(
      catchError(() => of<DrinksFiltersData>({brands: [], flavours: []}))
    );

  constructor(
    private drinkService: DrinkService,
    private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {

    this.subscription.add(
      this.sliderValue$
      .pipe(
        debounce(() => interval(this.SLIDER_REQUEST_DELAY)),
      )
      .subscribe((sliderValue: SliderValue) => {
        this.drinksParams = {...this.drinksParams, ...sliderValue};
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
    });
  }

  public onFiltersChanged(filters: any, filterKey: keyof DrinksParams): void {
    this.drinksParams[filterKey] = filters;
    this.fetchDrinksData();
  }

  public onSortChanged(selectedSortOption: {sortBy: string, sortOrder: string}): void {
    if (!(selectedSortOption.sortBy && selectedSortOption.sortOrder)) {
      return;
    }
    this.drinksParams = {...this.drinksParams, ...selectedSortOption};
    this.fetchDrinksData();
  }

  public compareObjects(object1: Object, object2: Object): boolean {
    return isEqual(object1, object2);
  }

  private fetchDrinksData(): void {
    this.subscription.add(
      this.drinkService.
      getDrinks(this.drinksParams).subscribe((data: Drink[]) => {
        this.drinks = data;
        this.cdr.markForCheck();
      })
    );
  }

  private fetchFiltersData(): Observable<DrinksFiltersData> {
    return forkJoin({
      brands: this.drinkService.getBrands(),
      flavours: this.drinkService.getFlavours()
    });
  }
}

type DrinksFiltersData = {
  brands: Array<string>,
  flavours: Array<string>
};

type SliderValue = {
  sugarMin: number,
  sugarMax: number
};
