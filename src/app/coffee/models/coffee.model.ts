import { CafeLocation } from 'src/app/core/models/cafe-location.model';
import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { ICoffee } from '../interfaces/coffee.interface';
import { TasteRating } from './taste-rating.model';

export class Coffee implements ICoffee {
  public id?: string;
  public name: string;
  public cafeName: string;
  public cafeLocation: CafeLocation;
  public type: CoffeeTypeEnum;
  public rating: number;
  public tasteRating: TasteRating;
  public notes?: string;
  public createdAt?: firebase.default.firestore.Timestamp;
  public updatedAt?: firebase.default.firestore.Timestamp;
  public imageUrl?: string;

  constructor(
    name = '',
    type = CoffeeTypeEnum.Americano,
    cafeName = '',
    cafeLocation = new CafeLocation(),
    rating = 1,
    tasteRating = new TasteRating(),
    notes = '',
    imageUrl = ''
  ) {
    this.name = name;
    this.type = type;
    this.cafeName = cafeName;
    this.cafeLocation = cafeLocation;
    this.rating = rating;
    this.tasteRating = tasteRating;
    this.notes = notes;
    this.imageUrl = imageUrl;
  }
}
