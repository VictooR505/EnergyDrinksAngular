import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { Observable, Subscription, catchError, forkJoin, of } from 'rxjs';
import { Drink } from "../drink";
import { DrinkService } from "../drink.service";

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Warto użyć gdzie się da ChangeDetection na OnPush - dużo korzystniej
                                                  // dla optymalizacji. Dzięki temu angular nie musi sprawdzać wszystkich
                                                  // zmian w całej aplikacji na nowo, warto poczytać jak znajdziesz chwilę
})
export class DrinkListComponent implements OnInit, OnDestroy {

  public drinks: Drink[] = [];
  public selectedSortingOption = {sortBy: 'id', sortOrder: 'ASC'};
  public selectedBrands: string[] = [];
  public selectedFlavours: string[] = [];
  public selectedSugarMin = 0;
  public selectedSugarMax = 75;


  private readonly subscription = new Subscription(); // zmienna przechowująca nasze subskrpycje abyśmy mogli je anulować przy ngOnDestroy()

  // przyjęło się że zmienne asynchroniczne oznaczamy na końcu "$" dla lepsze identyfikacji
  public filtersData$: Observable<DrinksFiltersData> = this.fetchFiltersData()
    .pipe(
      catchError(() => of<DrinksFiltersData>({brands: [], flavours: []}))
    );

  constructor(
    private drinkService: DrinkService,
    private cdr: ChangeDetectorRef) {
  }

  // dobrą praktyką jest oznaczanie private/public wszystkich metod
  public ngOnInit(): void {
    this.fetchDrinksData();

    // zastanawiam się po co mapowanie na valueOf() ? Zaciąganie normalnego string zamiast String nie da rady?
    // Przetestuj i daj znać bo chyba nie bedzie to potrzebne

      // this.drinkService.getBrands().subscribe(data => {
      // this.brands = data.map(str => str.valueOf());
      // });
      // this.drinkService.getFlavours().subscribe(data => {
      //     this.flavours = data.map(str => str.valueOf());
      // });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // aby zapobiec wyciekom pamięci podczas trwania np. jakiegoś trwającego requesta
                                     // warto robić coś takiego o ile nie używasz w templatce jakichś async pipe'ów
  }

  public onSortChanged(selectedSortOption: {sortBy: string, sortOrder: string}): void {
    if (!(selectedSortOption.sortBy && selectedSortOption.sortOrder)) {
      return;
    }
    this.selectedSortingOption = selectedSortOption;
    this.fetchDrinksData();
  }

  public compareObjects(object1: Object, object2: Object): boolean {
    // potrzebne sprawdzenie obiektów aby zaznaczyć defaultową opcję (jako że mamy porównanie obiektów a chcemy robic komparację po ngValue)
    // lodash to libka która oferuje ciekawe utilsowe funkcje
    // mimo wszystko wydaje mi się lepsze takie podejście niż przekazywanie query params poprzez surowy string
    return isEqual(object1, object2);
  }

  private fetchDrinksData(): void {
    this.subscription.add(
      this.drinkService.getAllDrinks(this.selectedSortingOption).subscribe((data: Drink[]) => {
        this.drinks = data;
        this.cdr.markForCheck(); // powiadamianie Angulara o zmianach dla widoku (synchronizacja) poczytaj o "Change detection OnPush"
      })
    );
  }

  /*private fetchFilterDrinksData(): void {
    this.subscription.add(
      this.drinkService.getFilterDrinks(this.selectedSortingOption).subscribe((data: Drink[]) => {
        this.drinks = data;
        this.cdr.markForCheck(); // powiadamianie Angulara o zmianach dla widoku (synchronizacja) poczytaj o "Change detection OnPush"
      })
    );
  }*/

  private fetchFiltersData(): Observable<DrinksFiltersData> {
    // do ogarnięcia rxjs, libka do asynchroniczności :D
    return forkJoin({
      brands: this.drinkService.getBrands(),
      flavours: this.drinkService.getFlavours()
    });
  }
}

type DrinksFiltersData = {
  brands: Array<string>, // mozna też użyć po prostu string[]
  flavours: Array<string>
};
