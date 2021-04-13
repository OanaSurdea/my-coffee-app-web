import { CoffeeSortTypeEnum } from '../enums/coffee-sort-type.enum';
import { SortDirectionEnum } from '../enums/sort-direction.enum';

export const CoffeeSortTypeMap: Map<CoffeeSortTypeEnum, SortDirectionEnum> = new Map([
  [CoffeeSortTypeEnum.DateCreated, SortDirectionEnum.Descending],
  [CoffeeSortTypeEnum.DateCreated, SortDirectionEnum.Ascending],
  [CoffeeSortTypeEnum.Rating, SortDirectionEnum.Descending],
]);
