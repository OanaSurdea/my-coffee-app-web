import { createReducer, on } from '@ngrx/store';
import { CoffeeSortTypeEnum } from 'src/app/core/enums/coffee-sort-type.enum';
import { sortByDateCreated, sortByRating } from './coffee.actions';

export interface ICoffeeState {
  coffeeListSortingOrder: CoffeeSortTypeEnum;
}

export const initialState: ICoffeeState = {
  coffeeListSortingOrder: CoffeeSortTypeEnum.DateCreated
};

const _coffeeReducer = createReducer(
  initialState,

  // Sort by - Date created
  on(sortByDateCreated, (state) => {
    return {
      ...state,
      coffeeListSortingOrder: CoffeeSortTypeEnum.DateCreated
    };
  }),

  // Sort by - Rating
  on(sortByRating, (state) => {
    return {
      ...state,
      coffeeListSortingOrder: CoffeeSortTypeEnum.Rating
    };
  })
);

export function coffeeReducer(state, action): any {
  return _coffeeReducer(state, action);
}
