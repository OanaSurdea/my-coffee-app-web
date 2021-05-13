import { ICoffeeDetailsRatingForm } from '../../interfaces';

export class CoffeeDetailsRatingForm implements ICoffeeDetailsRatingForm {
  overall: number;
  aroma?: number;
  body?: number;
  flavor?: number;
  intensity?: number;
  sweetness?: number;
  aftertaste?: number;

  constructor(
    overall = 3,
    aroma = 3,
    body = 3,
    flavor = 3,
    intensity = 3,
    sweetness = 3,
    aftertaste = 3,
  ) {
    this.overall = overall;
    this.aroma = aroma;
    this.body = body;
    this.flavor = flavor;
    this.intensity = intensity;
    this.sweetness = sweetness;
    this.aftertaste = aftertaste;
  }
}

