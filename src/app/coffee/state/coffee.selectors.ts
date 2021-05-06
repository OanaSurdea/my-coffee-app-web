import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoffeeState } from '.';


export const getCoffeeFeatureState = createFeatureSelector<ICoffeeState>('coffees');

export const getCoffeesListLayout = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.listLayout
);

export const getCoffeeFilters = createSelector(
  getCoffeeFeatureState, (state: ICoffeeState) => state.filters
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
