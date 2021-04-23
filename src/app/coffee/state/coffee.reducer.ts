import { Action, createReducer, on } from '@ngrx/store';
import { SortDirectionEnum } from 'src/app/core/enums/sort-direction.enum';
import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { ICoffeeState } from './coffee-state.interface';
import * as CoffeeActions from './coffee.actions';

// Initial State
export const initialCoffeeState: ICoffeeState = {
  selectedSortByOption: CoffeeSortByEnum.DateCreated,
  selectedSortDirectionOption: SortDirectionEnum.Ascending,
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
