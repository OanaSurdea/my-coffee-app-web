import { ITasteRating } from '../interfaces/taste-rating.interface';

export class TasteRating implements ITasteRating {
  overall: number;
  aroma?: number;
  body?: number;
  flavor?: number;
  intensity?: number;
  sweetness?: number;
  aftertaste?: number;

  constructor(
    overall = null,
    aroma = null,
    body = null,
    flavor = null,
    intensity = null,
    sweetness = null,
    aftertaste = null,
  ) {
    this.overall = aroma;
    this.aroma = aroma;
    this.body = body;
    this.flavor = flavor;
    this.intensity = intensity;
    this.sweetness = sweetness;
    this.aftertaste = aftertaste;
  }
}

