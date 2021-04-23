import { createAction, props } from '@ngrx/store';
import { CoffeeSortByEnum } from 'src/app/core/enums/coffee-sort-type.enum';
import { Coffee } from 'src/app/core/models/coffee.model';
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
  props<{ coffees$: Coffee[] }>()
);

export const loadCoffeesFailure = createAction(
  '[Coffee List] Load Fail',
  props<{ coffeesLoadError: string }>()
);
