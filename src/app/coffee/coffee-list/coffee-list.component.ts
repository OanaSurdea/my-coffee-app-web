import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IAppState } from '../../core/state';
import { ICoffee } from '../interfaces';
import { ICoffeeListFilters } from '../interfaces/coffee-list-filters.interface';
import { Coffee } from '../models/coffee';
import { CoffeeListFilters } from '../models/coffee-list-filters';
import * as CoffeeActions from '../state/coffee.actions';
import * as CoffeeSelectors from '../state/coffee.selectors';
import { ListLayoutEnum } from './../../core/enums/list-layout.enum';

@Component({
  selector: 'mca-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit, OnDestroy {
  // Subscriptions
  subscriptions: Subscription[] = [];

  // List
  public coffees$: BehaviorSubject<Coffee[]> = new BehaviorSubject([new Coffee()]);

  // Filters
  filters: ICoffeeListFilters = new CoffeeListFilters();
  listLayout: ListLayoutEnum = ListLayoutEnum.Grid;

  constructor(
    private store: Store<IAppState>
  ) {
    this.store.select(CoffeeSelectors.getCoffeeFilters).subscribe(filters => this.filters = filters);
    this.store.select(CoffeeSelectors.getCoffeesListLayout).subscribe(listLayout => this.listLayout = listLayout);
  }

  ngOnInit(): void {
    this._populateCoffeeList();
  }

  /*
   * Retrieves a coffees$ list based on,
   * the selected filters,
   */
  private _populateCoffeeList(): void {
    this.store.dispatch(CoffeeActions.loadCoffees());

    const subscription = this.store
      .select(CoffeeSelectors.getCoffees)
      .pipe(take(2))
      .subscribe((coffees: ICoffee[]) => this.coffees$.next(coffees));

    this.subscriptions.push(subscription);
  }

  public updateFilters(event: CoffeeListFilters): void {
    this.filters = event;

    this.store.dispatch(
      CoffeeActions.filterCoffees({ filters: this.filters })
    );

    this._populateCoffeeList();
  }

  public readonly matcher = (coffee: Coffee, search: string): boolean => {
    let result: boolean | undefined = false;

    if (coffee && search) {
      search = search.toLowerCase();

      result = (
        (coffee.details.type.toLowerCase().includes(search)) ||
        (coffee.details.name.toLowerCase().includes(search)) ||
        (coffee.cafe.name.toLowerCase().includes(search)) ||
        (coffee.cafe.address.toLowerCase().includes(search)) ||
        (coffee.cafe.city.toLowerCase().includes(search)) ||
        (coffee.createdAt?.toDate().toString().toLowerCase().includes(search)) ||
        (coffee.tasteRating.overall.toString().toLowerCase().includes(search)) ||
        (coffee.details.notes?.toLowerCase().includes(search))
      );
    }

    return result || false;
  }


  public updateListLayout(event: ListLayoutEnum): void {
    this.listLayout = event;

    this.store.dispatch(
      CoffeeActions.changeListLayout({ listLayout: this.listLayout })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s?.unsubscribe());
  }
}
function TuiMapper<T, U>() {
  throw new Error('Function not implemented.');
}

