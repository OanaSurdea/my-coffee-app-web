import { CoffeeTypeEnum } from '../../enums';
import { ICoffeeDetailsAboutForm } from '../../interfaces';

export class CoffeeDetailsAboutForm implements ICoffeeDetailsAboutForm {
  // Details
  public name: string;
  public type: CoffeeTypeEnum;
  public imageUrl?: string;
  public notes?: string;

  constructor(
    // Details
    name = null,
    type = null,
    imageUrl = null,
    notes = null,
  ) {
    // Details
    this.name = name;
    this.type = type;
    this.imageUrl = imageUrl;
    this.notes = notes;
  }
}
