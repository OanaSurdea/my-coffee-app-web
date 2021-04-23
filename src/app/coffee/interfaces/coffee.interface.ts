import { CoffeeTypeEnum } from 'src/app/coffee/enums/coffee-type.enum';
import { CafeLocation } from '../../core/models/cafe-location.model';
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
  createdAt?: firebase.default.firestore.Timestamp;
  updatedAt?: firebase.default.firestore.Timestamp;
}
