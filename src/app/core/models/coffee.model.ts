import { CafeLocation } from './cafe-location.model';
import { TasteRating } from './taste-rating.model';
import { ICoffee } from '../interfaces/coffee.interface';
import { CoffeeTypeEnum } from '../enums/coffee-type.enum';

export class Coffee implements ICoffee {
  public _id: string;
  public name: string;
  public cafe: string;
  public type: CoffeeTypeEnum;
  public cafeLocation: CafeLocation;
  public rating: number;
  public tasteRating: TasteRating;
  public notes?: string;

  constructor(
    name = '',
    cafe = '',
    type = CoffeeTypeEnum.Cappucino,
    cafeLocation = new CafeLocation(),
    rating = 1,
    tasteRating = new TasteRating(),
    notes = ''
  ) {
    this.name = name;
    this.cafe = cafe;
    this.type = type;
    this.cafeLocation = cafeLocation;
    this.rating = rating;
    this.tasteRating = tasteRating;
    this.notes = notes;
  }
}
