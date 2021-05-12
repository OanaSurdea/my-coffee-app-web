import { Injectable } from '@angular/core';
import { CoffeeTypeEnum } from 'src/app/coffee/enums/coffee-type.enum';
import { TasteRating } from 'src/app/coffee/models/taste-rating';
import { Coffee } from '../../coffee/models/coffee';
import { Cafe } from '../models';
import { CoffeeDetails } from './../../coffee/models/coffee-details';

@Injectable({
  providedIn: 'root'
})
export class MockCofeeDataService {

  constructor() { }

  getAll(onSuccess: any): void {
    // TODO: Change it with a real Web Service
    // // Details
    // name = '',
    // type = CoffeeTypeEnum.Americano,
    // cafe = new Cafe(),
    // notes = '',

    // // Image
    // imageUrl = null,

    // // Rating
    // rating = 1,
    // tasteRating = new TasteRating(),

    const coffeeList: Coffee[] = [
      new Coffee(
        new CoffeeDetails('Double Espresso', CoffeeTypeEnum.Espresso, '', 'Great buzz'),
        new Cafe('Sunny Cafe', '123 Market St', 'San Francisco'),
        new TasteRating(4, 4, 4, 4, 3, 4, 3),
      ),
      new Coffee(
        new CoffeeDetails('Caramel Americano', CoffeeTypeEnum.Americano, '', 'Strong taste'),
        new Cafe('Starcoffee', 'Gran Via 34', 'Madrid'),
        new TasteRating(4, 5, 5, 5, 5, 4, 4),
      )
    ];

    onSuccess(coffeeList);
  }

  saveOne(coffee: Coffee, callBack: (response: boolean) => void): void {
    // TODO: Change it with a real Web Service

    callBack(true);
  }
}
