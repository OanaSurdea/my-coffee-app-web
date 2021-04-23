import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoffeeState } from '.';


export const getCoffeeFeatureState = createFeatureSelector<ICoffeeState>('coffees');

export const getCoffeesSortByOption = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.selectedSortByOption
);

export const getCoffeesSortDirectionOption = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.selectedSortDirectionOption
);

export const getCoffeesSortingOptions = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => ({
    selectedSortByOption: state.selectedSortByOption,
    selectedSortDirectionOption: state.selectedSortDirectionOption
  })
);

export const getCoffees = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.coffees$
);

export const getAreCoffeesLoading = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.areCoffeesLoading
);

export const getCoffeesLoadingError = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.areCoffeesLoading
);
