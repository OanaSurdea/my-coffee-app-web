import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ICoffeeState } from 'src/app/coffee/state/coffee-state.interface';
import { ICoffee } from '../interfaces/coffee.interface';
import * as CoffeeActions from '../state/coffee.actions';
import * as CoffeeSelectors from '../state/coffee.selectors';
import { CoffeeDataService } from './../../core/services/coffee-data.service';

@Injectable()
export class CoffeeEffects {


  constructor(
    private actions: Actions,
    private store: Store<ICoffeeState>,
    private coffeeService: CoffeeDataService
  ) { }

  public loadCoffees$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CoffeeActions.loadCoffees),
      withLatestFrom(this.store.select(CoffeeSelectors.getCoffeesSortingOptions)),
      mergeMap(([action, sortingOptions]) => {
        return this.coffeeService
          .getAllSorted(sortingOptions.selectedSortByOption, sortingOptions.selectedSortDirectionOption)
          .pipe(
            map((coffees$: ICoffee[]) => CoffeeActions.loadCoffeesSuccess({ coffees$ })),
            catchError((coffeesLoadError: string) => of(CoffeeActions.loadCoffeesFailure({ coffeesLoadError })))
          )
      })
    );
  });
}
