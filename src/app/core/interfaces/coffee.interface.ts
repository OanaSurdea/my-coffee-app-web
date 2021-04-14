import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { CafeLocation } from './../models/cafe-location.model';
import { ITasteRating } from './taste-rating.interface';

export interface ICoffee {
  id?: string;
  name: string;
  cafeName: string;
  cafeLocation: CafeLocation;
  type: CoffeeTypeEnum;
  rating: number;
  tasteRating: ITasteRating;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
