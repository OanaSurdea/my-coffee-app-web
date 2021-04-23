import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { SortDirectionEnum } from '../enums/sort-direction.enum';

export const CoffeeSortTypeMap: Map<CoffeeSortByEnum, SortDirectionEnum> = new Map([
  [CoffeeSortByEnum.DateCreated, SortDirectionEnum.Descending],
  [CoffeeSortByEnum.DateCreated, SortDirectionEnum.Ascending],
  [CoffeeSortByEnum.Rating, SortDirectionEnum.Descending],
]);
