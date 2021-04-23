import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IAppState } from 'src/app/core/state/app-state.interface';
import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { ICoffee } from '../interfaces/coffee.interface';
import * as CoffeeActions from '../state/coffee.actions';
import * as CoffeeSelectors from '../state/coffee.selectors';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';
import { GeolocationService } from './../../core/services/geolocation.service';

@Component({
  selector: 'mca-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit, OnDestroy {
  // Subscriptions
  getCoffeesFromStoreSubscription: Subscription;

  // List
  public coffees$: BehaviorSubject<ICoffee[]> = new BehaviorSubject([]);

  // Sorting
  sortByOptions: any = CoffeeSortByEnum;
  selectedSortByOption: CoffeeSortByEnum = CoffeeSortByEnum.DateCreated;

  sortDirectionOptions: any = SortDirectionEnum;
  selectedSortDirectionOption: SortDirectionEnum = SortDirectionEnum.Ascending;

  // List Layout
  // layoutOptions: any =

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.renderCoffeeList();
  }

  public renderCoffeeList(): void {
    this._setSelectedSortByOption();
    this._setSelectedSortDirectionOption();
    this._populateCoffeeList();
  }

  /*
   * This function gets a list of coffees based on,
   * the selected sortType and it's matching sort direction,
   */
  private _populateCoffeeList(): void {
    this.store.dispatch(CoffeeActions.loadCoffees());

    this.getCoffeesFromStoreSubscription = this.store
      .select(CoffeeSelectors.getCoffees)
      .pipe(take(2))
      .subscribe((coffees: ICoffee[]) => this.coffees$.next(coffees));
  }

  private _setSelectedSortByOption(): void {
    this.store.dispatch(CoffeeActions.selectSortByOption(
      { selectedSortByOption: this.selectedSortByOption }
    ));
  }

  private _setSelectedSortDirectionOption(): void {
    this.store.dispatch(CoffeeActions.selectSortDirectionOption(
      { selectedSortDirectionOption: this.selectedSortDirectionOption }
    ));
  }

  public viewCoffeeDetails(id: string): void {
    this.router.navigate(['coffees', id]);
  }

  public openMaps(coffee: ICoffee): void {
    const mapURL = this.geolocationService.getFormattedMapUrlFrom(coffee.cafeLocation);
    location.href = mapURL;
  }

  public shareCoffeeRating(coffee: ICoffee): void {
    const shareCoffeeText = `I had this coffee at ${coffee.cafeName} and for me it's a ${coffee.rating}.`;

    if ('share' in navigator) {
      navigator.share({
        title: coffee.name,
        text: shareCoffeeText,
        url: window.location.href
      })
        .then(() => console.log('Coffee shared'))
        .catch((error) => { throw new Error(`Coffee share Error: ${error}`); });
    } else {
      const shareCoffeeURL = `whatsapp://send?text=${encodeURIComponent(shareCoffeeText)}`;
      location.href = shareCoffeeURL;
    }
  }

  ngOnDestroy(): void {
    this.getCoffeesFromStoreSubscription?.unsubscribe();
  }
}
