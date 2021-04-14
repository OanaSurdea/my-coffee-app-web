import { Injectable } from '@angular/core';
import { CafeLocation } from 'src/app/core/models/cafe-location.model';
import { CoffeeTypeEnum } from '../enums/coffee-type.enum';
import { Coffee } from '../models/coffee.model';
import { TasteRating } from '../models/taste-rating.model';

@Injectable({
  providedIn: 'root'
})
export class MockCofeeDataService {

  constructor() { }

  getCoffeeList(onSuccess: any): void {
    // TODO: Change it with a real Web Service

    const coffeeList: Coffee[] = [
      new Coffee(
        'Double Espresso',
        CoffeeTypeEnum.Espresso,
        'Sunny Cafe',
        new CafeLocation('123 Market St', 'San Francisco'),
        4,
        new TasteRating(4, 4, 4, 3, 4, 3),
        'Great buzz'
      ),
      new Coffee(
        'Caramel Americano',
        CoffeeTypeEnum.Americano,
        'Starcoffee',
        new CafeLocation('Gran Via 34', 'Madrid'),
        5,
        new TasteRating(5, 5, 5, 5, 4, 4),
        'Tasted strong'
      )
    ];

    onSuccess(coffeeList);
  }

  saveCoffeeEntry(coffee: Coffee, onSuccess: any): void {
    // TODO: Change it with a real Web Service

    onSuccess(true);
  }
}
