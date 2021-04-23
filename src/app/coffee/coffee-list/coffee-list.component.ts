import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListLayoutEnum, SortDirectionEnum } from '../../core/enums';
import { GeolocationService } from '../../core/services';
import { IAppState } from '../../core/state';
import { CoffeeSortByEnum } from '../enums';
import { ICoffee } from '../interfaces';
import * as CoffeeActions from '../state/coffee.actions';
import * as CoffeeSelectors from '../state/coffee.selectors';

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
  layoutOptions: any = ListLayoutEnum;
  selectedLayoutOption: ListLayoutEnum = ListLayoutEnum.List;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private breakpointObserver: BreakpointObserver,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this._initLayout();
    this.renderCoffeeList();
  }

  public renderCoffeeList(): void {
    this._setSelectedSortByOption();
    this._setSelectedSortDirectionOption();
    this._setSelectedLayoutOption();

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

  private _initLayout(): void {
    this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.selectedLayoutOption = ListLayoutEnum.List;
      } else {
        this.selectedLayoutOption = ListLayoutEnum.Grid;
      }

      this.store.dispatch(CoffeeActions.selectLayoutOption(
        { selectedLayoutOption: this.selectedLayoutOption }
      ));
    });
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

  private _setSelectedLayoutOption(): void {
    this.store.dispatch(CoffeeActions.selectLayoutOption(
      { selectedLayoutOption: this.selectedLayoutOption }
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
