import { CafeLocation } from './cafe-location.model';
import { TasteRating } from './taste-rating.model';
import { ICoffee } from '../interfaces/coffee.interface';
import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { ICafeLocation } from '../interfaces/cafe-location.interface';
import { ITasteRating } from '../interfaces/taste-rating.interface';

export class Coffee implements ICoffee {
  public id?: string;
  public name: string;
  public cafeName: string;
  public cafeLocation: CafeLocation;
  public type: CoffeeTypeEnum;
  public rating: number;
  public tasteRating: TasteRating;
  public notes?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    name = '',
    type = CoffeeTypeEnum.Americano,
    cafeName = '',
    cafeLocation = new CafeLocation(),
    rating = 1,
    tasteRating = new TasteRating(),
    notes = ''
  ) {
    this.name = name;
    this.type = type;
    this.cafeName = cafeName;
    this.cafeLocation = cafeLocation;
    this.rating = rating;
    this.tasteRating = tasteRating;
    this.notes = notes;
  }
}
