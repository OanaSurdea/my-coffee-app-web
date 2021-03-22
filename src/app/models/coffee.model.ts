import { CafeLocation } from './cafe-location.model';
import { ICoffee } from './coffee.interface';
import { TasteRating } from './taste-rating.model';

export class Coffee implements ICoffee {
  public name: string;
  public cafe: string;
  public type: string;
  public cafeLocation: CafeLocation;
  public rating: number;
  public tasteRating: TasteRating;
  public notes?: string;

  constructor(values?: ICoffee) {
    Object.assign(this, values);
  }
}
