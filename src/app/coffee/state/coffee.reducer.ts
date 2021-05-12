import { Action, createReducer, on } from '@ngrx/store';
import { ICoffeeState } from '.';
import { CoffeeSortByEnum } from '../enums';
import * as CoffeeActions from '../state/coffee.actions';
import { ListLayoutEnum, SortDirectionEnum } from './../../core/enums';
import { CoffeeListFilters } from './../models/coffee-list-filters';

// Initial State
export const initialCoffeeState: ICoffeeState = {
  listLayout: ListLayoutEnum.Grid,
  filters: new CoffeeListFilters(
    '',
    CoffeeSortByEnum.DateCreated,
    SortDirectionEnum.Descending,
  ),

  areCoffeesLoading: false,
  coffees$: [],
  coffeesLoadError: '',
};

// Reducer
const reducer = createReducer<ICoffeeState>(
  initialCoffeeState,

  on(
    // Add simple Actions here
    CoffeeActions.changeListLayout,
    CoffeeActions.filterCoffees,

    CoffeeActions.loadCoffees,
    CoffeeActions.loadCoffeesFailure,
    CoffeeActions.loadCoffeesSuccess,
    (state: ICoffeeState, action: Action) =>
      ({ ...state, ...action })
  )
);

// Export Reducer
export function coffeeReducer(
  state: ICoffeeState | undefined,
  action: Action
): ICoffeeState {
  return reducer(state, action);
}
