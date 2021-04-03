import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { IFormOption } from '../interfaces/form-option.interface';

export const CoffeeTypeMap: Map<CoffeeTypeEnum, string> = new Map([
  [CoffeeTypeEnum.Americano, 'Americano'],
  [CoffeeTypeEnum.Cappucino, 'Cappucino'],
  [CoffeeTypeEnum.Espresso, 'Espresso'],
  [CoffeeTypeEnum.Frappe, 'Frappé'],
  [CoffeeTypeEnum.Ristretto, 'Ristretto'],
  [CoffeeTypeEnum.Other, 'Other'],
]);

export const CoffeeTypeFormOptions: IFormOption[] = [
  { value: CoffeeTypeEnum.Americano, label: 'Americano' },
  { value: CoffeeTypeEnum.Cappucino, label: 'Cappucino' },
  { value: CoffeeTypeEnum.Espresso, label: 'Espresso' },
  { value: CoffeeTypeEnum.Frappe, label: 'Frappé' },
  { value: CoffeeTypeEnum.Ristretto, label: 'Ristretto' },
  { value: CoffeeTypeEnum.Other, label: 'Other' },
];
