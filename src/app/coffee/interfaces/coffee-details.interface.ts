import { CoffeeTypeEnum } from '../enums';

export interface ICoffeeDetails {
  name: string;
  type: CoffeeTypeEnum;
  imageUrl: string;
  notes?: string;
}
