import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { CoffeeSortDirectionEnum } from '../enums/sort-direction.enum';

export const CoffeeSortTypeMap: Map<CoffeeSortByEnum, CoffeeSortDirectionEnum> = new Map([
  [CoffeeSortByEnum.DateCreated, CoffeeSortDirectionEnum.Descending],
  [CoffeeSortByEnum.DateCreated, CoffeeSortDirectionEnum.Ascending],
  [CoffeeSortByEnum.Rating, CoffeeSortDirectionEnum.Descending],
]);
