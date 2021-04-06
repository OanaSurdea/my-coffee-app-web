import { FirestoreService } from './firestore.service';
import { environment } from './../../../environments/environment.prod';
import { Coffee } from '../models/coffee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cafe } from '../models/cafe';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoffeeDataService {

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private firestoreService: FirestoreService,
  ) { }

  public endpointBase = environment.apiEndpoint;

  getCoffeeList(): Observable<Coffee[]> {
    // this.http.get(`${this.endpointBase}/coffees`).subscribe(
    //   (coffeeList: Coffee[]) => onSuccess(coffeeList),
    //   (error) => console.log('Get Coffee List Error: ', error)
    // );
    return this.firestoreService.colWithIds$('coffees');
  }

  getCoffee(id: string): Observable<Coffee> {
    // this.http.get(`${this.endpointBase}/coffees/${id}`).subscribe(
    //   (coffee: Coffee) => onSuccess(coffee),
    //   (error) => console.log('Get Coffee Error: ', error)
    // );
    return this.firestoreService.doc$(`coffees/${id}`);
  }

  saveCoffeeEntry(coffee: Coffee, onSuccess: any): void {
    // if (coffee.id) {
    //   this.http.put(`${this.endpointBase}/coffees/${coffee.id}`, coffee).subscribe(
    //     () => onSuccess(true),
    //     (error) => console.log('Update Coffee Error: ', error)
    //   );
    // } else {
    //   this.http.post(`${this.endpointBase}/coffees`, coffee).subscribe(
    //     () => onSuccess(true),
    //     (error) => console.log('Save Coffee Error: ', error)
    //   );
    // }
    if (coffee.id && coffee.id.length > 4) {
      this.firestoreService.update(`coffees/${coffee.id}`, coffee).then(
        () => onSuccess(true),
        (error) => { throw new Error(`Update Coffee Error: ${error}`); }
        );
      } else {
      this.firestoreService.add('coffees', coffee).then(
        () => onSuccess(true),
        (error) => { throw new Error(`Save Coffee Error: ${error}`); }
      );
    }
  }

}
