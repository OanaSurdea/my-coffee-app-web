import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Coffee } from 'src/app/core/models/coffee.model';
import { IAppState } from 'src/app/core/state/app-state.interface';
import { sortByDateCreated, sortByRating } from '../state/coffee.actions';
import { ICoffeeState } from '../state/coffee.reducer';
import { CoffeeSortTypeEnum } from './../../core/enums/coffee-sort-type.enum';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';
import { CoffeeSortTypeMap } from './../../core/maps/coffee-sort-type.map';
import { CoffeeDataService } from './../../core/services/coffee-data.service';
import { GeolocationService } from './../../core/services/geolocation.service';

@Component({
  selector: 'mca-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit {
  // List
  public coffeeList: BehaviorSubject<Coffee[]> = new BehaviorSubject([]);

  // Sorting
  sortType: CoffeeSortTypeEnum = CoffeeSortTypeEnum.DateCreated;
  sortTypeOptions: any = CoffeeSortTypeEnum;
  coffeeSortTypeMap: Map<CoffeeSortTypeEnum, SortDirectionEnum> = CoffeeSortTypeMap;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private coffeeDataService: CoffeeDataService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.renderCoffeeList();
  }

  public renderCoffeeList(): void {
    this._dispatchSortingActionsBasedOnSelectedSortType();
    this._getCoffeeListData();
  }

  /*
   * This function gets a list of coffees based on,
   * the selected sortType and it's matching sort direction,
   */
  private _getCoffeeListData(): void {
    this.coffeeDataService
      .getOrderedCoffeeList(this._gettSortingTypeFromStore(), this._getSortingDirectionForSelectedSortType())
      .subscribe((coffees: Coffee[]) => this.coffeeList.next(coffees));
  }

  private _gettSortingTypeFromStore(): CoffeeSortTypeEnum {
    this.store.select('coffees').toPromise()
      .then((state: ICoffeeState) => this.sortType = state.coffeeListSortingOrder)
      .catch((error) => console.log('Could not retrieve <coffeeListSortingOrder> from store', error));

    return this.sortType;
  }

  private _getSortingDirectionForSelectedSortType(): SortDirectionEnum {
    return this.coffeeSortTypeMap.get(this.sortType);
  }

  private _dispatchSortingActionsBasedOnSelectedSortType(): void {
    switch (this.sortType) {
      case CoffeeSortTypeEnum.DateCreated:
        this.store.dispatch(sortByDateCreated());
        break;

      case CoffeeSortTypeEnum.Rating:
        this.store.dispatch(sortByRating());
        break;
    }
  }

  public viewCoffeeDetails(id: string): void {
    this.router.navigate(['coffees', id]);
  }

  public openMaps(coffee: Coffee): void {
    const mapURL = this.geolocationService.getFormattedMapUrlFrom(coffee.cafeLocation);
    location.href = mapURL;
  }

  public shareCoffeeRating(coffee: Coffee): void {
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
}
