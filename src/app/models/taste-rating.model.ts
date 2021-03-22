import { ITasteRating } from './taste-rating.interface';

export class TasteRating implements ITasteRating {
  aroma: number;
  body: number;
  flavor: number;
  intensity: number;
  sweetness: number;
  aftertaste: number;

  constructor(values: ITasteRating) {
    Object.assign(this, values);
  }
}

