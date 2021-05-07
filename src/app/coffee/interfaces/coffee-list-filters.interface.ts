import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';
import { CoffeeSortByEnum } from './../enums/coffee-sort-type.enum';

export interface ICoffeeListFilters {
  search?: string;
  sortBy?: CoffeeSortByEnum;
  sortDirection?: SortDirectionEnum;
}
