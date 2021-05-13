import { SortDirectionEnum } from 'src/app/core/enums';
import { CoffeeSortByEnum } from '../enums';

export interface ICoffeeListFilters {
  search?: string;
  sortBy?: CoffeeSortByEnum;
  sortDirection?: SortDirectionEnum;
}
