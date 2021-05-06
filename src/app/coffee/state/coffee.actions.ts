import { createAction, props } from '@ngrx/store';
import { ListLayoutEnum } from '../../core/enums';
import { ICoffee } from '../interfaces';
import { CoffeeListFilters } from './../models/coffee-list-filters';

export const changeListLayout = createAction(
  '[Coffee List] Change list layout option',
  props<{ listLayout: ListLayoutEnum }>()
);

export const filterCoffees = createAction(
  '[Coffee List] Change filters',
  props<{ filters: CoffeeListFilters }>()
);

export const loadCoffees = createAction(
  '[Coffee List] Load',
);

export const loadCoffeesSuccess = createAction(
  '[Coffee List] Load Success',
  props<{ coffees$: ICoffee[] }>()
);

export const loadCoffeesFailure = createAction(
  '[Coffee List] Load Fail',
  props<{ coffeesLoadError: string }>()
);
