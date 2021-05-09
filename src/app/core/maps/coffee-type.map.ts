import { CoffeeTypeEnum } from 'src/app/coffee/enums/coffee-type.enum';
import { IFormOption } from '../interfaces/form-option.interface';

export const CoffeeTypeMap: Map<CoffeeTypeEnum, string> = new Map([
  [CoffeeTypeEnum.Americano, 'Americano'],
  [CoffeeTypeEnum.Cappuccino, 'Cappuccino'],
  [CoffeeTypeEnum.Espresso, 'Espresso'],
  [CoffeeTypeEnum.Frappe, 'Frappé'],
  [CoffeeTypeEnum.Ristretto, 'Ristretto'],
  [CoffeeTypeEnum.Other, 'Other'],
]);

export const CoffeeTypeFormOptions: IFormOption<CoffeeTypeEnum, string>[] = [
  { value: CoffeeTypeEnum.Americano, label: 'Americano' },
  { value: CoffeeTypeEnum.Cappuccino, label: 'Cappuccino' },
  { value: CoffeeTypeEnum.Espresso, label: 'Espresso' },
  { value: CoffeeTypeEnum.Frappe, label: 'Frappé' },
  { value: CoffeeTypeEnum.Ristretto, label: 'Ristretto' },
  { value: CoffeeTypeEnum.Other, label: 'Other' },
];
