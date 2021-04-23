import { Injectable } from '@angular/core';
import { CoffeeTypeEnum } from 'src/app/coffee/enums/coffee-type.enum';
import { TasteRating } from 'src/app/coffee/models/taste-rating.model';
import { CafeLocation } from 'src/app/core/models/cafe-location.model';
import { Coffee } from '../../coffee/models/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class MockCofeeDataService {

  constructor() { }

  getAll(onSuccess: any): void {
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

  saveOne(coffee: Coffee, onSuccess: any): void {
    // TODO: Change it with a real Web Service

    onSuccess(true);
  }
}
