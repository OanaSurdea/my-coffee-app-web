import { TasteRating } from './../../models/taste-rating.model';
import { CafeLocation } from 'src/app/models/cafe-location.model';
import { Coffee } from './../../models/coffee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCoffeeList(onSuccess: any): void {
    // TODO: Change it with a real Web Service

    const coffeeList = [
      new Coffee({
        name: 'Double Espresso',
        cafe: 'Sunny Cafe',
        cafeLocation: new CafeLocation({
          address: '123 Market St',
          city: 'San Francisco'
        }),
        rating: 4,
        tasteRating: new TasteRating({
          aroma: 4,
          body: 4,
          flavor: 4,
          intensity: 3,
          sweetness: 4,
          aftertaste: 3,
        })
      }),
      new Coffee({
        name: 'Caramel Americano',
        cafe: 'Starcoffee',
        cafeLocation: new CafeLocation({
          address: 'Gran Via 34',
          city: 'Madrid'
        }),
        rating: 5,
        tasteRating: new TasteRating({
          aroma: 5,
          body: 5,
          flavor: 5,
          intensity: 5,
          sweetness: 4,
          aftertaste: 4,
        })
      })
    ];

    onSuccess(coffeeList);
  }

  saveCoffeeEntry(coffee: Coffee, onSuccess: any): void {
    // TODO: Change it with a real Web Service
    onSuccess(true);
  }
}
