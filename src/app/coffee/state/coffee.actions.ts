import { createAction, props } from '@ngrx/store';
import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { ICoffee } from '../interfaces/coffee.interface';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';


export const selectSortByOption = createAction(
  '[Coffee List] Change list sort by option',
  props<{ selectedSortByOption: CoffeeSortByEnum }>()
);

export const selectSortDirectionOption = createAction(
  '[Coffee List] Change list sort direction option',
  props<{ selectedSortDirectionOption: SortDirectionEnum }>()
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
