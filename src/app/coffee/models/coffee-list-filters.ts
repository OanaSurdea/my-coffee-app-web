import { SortDirectionEnum } from 'src/app/core/enums';
import { CoffeeSortByEnum } from '../enums';
import { ICoffeeListFilters } from '../interfaces/coffee-list-filters.interface';

export class CoffeeListFilters implements ICoffeeListFilters {
  sortBy?: CoffeeSortByEnum;
  sortDirection?: SortDirectionEnum;

  constructor(
    sortBy = CoffeeSortByEnum.DateCreated,
    sortDirection = SortDirectionEnum.Descending,
  ) {
    this.sortBy = sortBy;
    this.sortDirection = sortDirection;
  }

}
