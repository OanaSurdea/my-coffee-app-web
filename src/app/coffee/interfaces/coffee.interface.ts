import { ICafe } from 'src/app/core/interfaces';
import { ITasteRating } from '.';
import { ICoffeeDetails } from './coffee-details.interface';

export interface ICoffee {
  // Details
  details: ICoffeeDetails;

  // Cafe
  cafe: ICafe;

  // Rating
  tasteRating: ITasteRating;

  // Meta
  id?: string;
  createdAt?: firebase.default.firestore.Timestamp;
  updatedAt?: firebase.default.firestore.Timestamp;
}
