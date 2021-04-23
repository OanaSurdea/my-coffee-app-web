import { Action, createReducer, on } from '@ngrx/store';
import { ICoffeeState } from '.';
import { CoffeeSortByEnum } from '../enums';
import * as CoffeeActions from '../state/coffee.actions';
import { ListLayoutEnum, SortDirectionEnum } from './../../core/enums';

// Initial State
export const initialCoffeeState: ICoffeeState = {
  selectedSortByOption: CoffeeSortByEnum.DateCreated,
  selectedSortDirectionOption: SortDirectionEnum.Ascending,
  selectedLayoutOption: ListLayoutEnum.List,
  areCoffeesLoading: false,
  coffees$: [],
  coffeesLoadError: null,
};

// Reducer
const reducer = createReducer<ICoffeeState>(
  initialCoffeeState,

  on(
    // Add simple Actions here
    CoffeeActions.selectSortByOption,
    CoffeeActions.selectSortDirectionOption,
    CoffeeActions.selectLayoutOption,

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
