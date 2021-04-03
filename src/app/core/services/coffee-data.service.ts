import { environment } from './../../../environments/environment.prod';
import { Coffee } from '../models/coffee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoffeeDataService {

  constructor(private http: HttpClient) { }

  public endpointBase = environment.apiEndpoint;

  getCoffeeList(onSuccess: any): void {
    this.http.get(`${this.endpointBase}/coffees`).subscribe(
      (coffeeList: Coffee[]) => onSuccess(coffeeList),
      (error) => console.log('Get Coffee List Error: ', error)
    );
  }

  getCoffee(id: string, onSuccess: any): void {
    this.http.get(`${this.endpointBase}/coffees/${id}`).subscribe(
      (coffee: Coffee) => onSuccess(coffee),
      (error) => console.log('Get Coffee Error: ', error)
    );
  }

  saveCoffeeEntry(coffee: Coffee, onSuccess: any): void {
    if (coffee._id) {
      this.http.put(`${this.endpointBase}/coffees/${coffee._id}`, coffee).subscribe(
        () => onSuccess(true),
        (error) => console.log('Update Coffee Error: ', error)
      );
    } else {
      this.http.post(`${this.endpointBase}/coffees`, coffee).subscribe(
        () => onSuccess(true),
        (error) => console.log('Save Coffee Error: ', error)
      );
    }
  }
}
