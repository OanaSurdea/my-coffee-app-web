import { ITasteRating } from '../../coffee/interfaces/taste-rating.interface';

export class TasteRating implements ITasteRating {
  aroma: number;
  body: number;
  flavor: number;
  intensity: number;
  sweetness: number;
  aftertaste: number;

  constructor(
    aroma = 1,
    body = 1,
    flavor = 1,
    intensity = 1,
    sweetness = 1,
    aftertaste = 1,
  ) {
    this.aroma = aroma;
    this.body = body;
    this.flavor = flavor;
    this.intensity = intensity;
    this.sweetness = sweetness;
    this.aftertaste = aftertaste;
  }
}

