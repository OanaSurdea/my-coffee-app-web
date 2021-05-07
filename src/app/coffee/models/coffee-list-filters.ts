import { SortDirectionEnum } from 'src/app/core/enums';
import { CoffeeSortByEnum } from '../enums';
import { ICoffeeListFilters } from '../interfaces/coffee-list-filters.interface';

export class CoffeeListFilters implements ICoffeeListFilters {
  search?: string;
  sortBy?: CoffeeSortByEnum;
  sortDirection?: SortDirectionEnum;

  constructor(
    search = '',
    sortBy = CoffeeSortByEnum.DateCreated,
    sortDirection = SortDirectionEnum.Descending,
  ) {
    this.search = search;
    this.sortBy = sortBy;
    this.sortDirection = sortDirection;
  }

}
