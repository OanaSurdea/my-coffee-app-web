import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { ICafeLocation } from './cafe-location.interface';
import { ITasteRating } from './taste-rating.interface';

export interface ICoffee {
  name: string;
  cafe: string;
  type?: CoffeeTypeEnum;
  cafeLocation: ICafeLocation;
  rating: number;
  tasteRating: ITasteRating;
  notes?: string;
}
