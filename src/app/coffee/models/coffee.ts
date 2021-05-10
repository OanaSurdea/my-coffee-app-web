import { Cafe } from 'src/app/core/models';
import { ICoffee } from '../interfaces/coffee.interface';
import { CoffeeDetails } from './coffee-details';
import { TasteRating } from './taste-rating';

export class Coffee implements ICoffee {
  // Details
  public details: CoffeeDetails;

  // Cafe
  public cafe: Cafe;

  // Rating
  public tasteRating: TasteRating;

  // Meta
  public id?: string;
  public createdAt?: firebase.default.firestore.Timestamp;
  public updatedAt?: firebase.default.firestore.Timestamp;

  constructor(
    details = new CoffeeDetails(),
    cafe = new Cafe(),
    tasteRating = new TasteRating(),
  ) {
    this.details = details;
    this.cafe = cafe;
    this.tasteRating = tasteRating;
  }
}
