import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { ICoffeeDetails } from '../interfaces/coffee-details.interface';

export class CoffeeDetails implements ICoffeeDetails {
  // Details
  public name: string;
  public type: CoffeeTypeEnum;
  public imageUrl: string;
  public notes?: string;

  constructor(
    // Details
    name = '',
    type = CoffeeTypeEnum.Americano,
    imageUrl = '',
    notes = '',
  ) {
    // Details
    this.name = name;
    this.type = type;
    this.imageUrl = imageUrl;
    this.notes = notes;
  }
}
