import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoffeeSortByEnum } from 'src/app/coffee/enums/coffee-sort-type.enum';
import { Coffee } from '../models/coffee.model';
import { environment } from './../../../environments/environment.prod';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CoffeeDataService {

  constructor(
    private firestoreService: FirestoreService,
  ) { }

  public endpointBase = environment.apiEndpoint;

  getAll(): Observable<Coffee[]> {
    return this.firestoreService.colWithIds$('coffees');
  }

  getAllSorted(fieldName: CoffeeSortByEnum, direction: 'asc' | 'desc'): Observable<Coffee[]> {
    return this.firestoreService.colWithIdsOrderBy$('coffees', fieldName, direction);
  }

  getOne(id: string): Observable<Coffee> {
    return this.firestoreService.doc$(`coffees/${id}`);
  }

  saveOne(coffee: Coffee, onSuccess: any): Promise<void> {
    if (coffee.id && coffee.id.length > 4) {
      return this.firestoreService.update(`coffees/${coffee.id}`, coffee).then(
        () => onSuccess(true),
        (error) => { throw new Error(`Update Coffee Error: ${error}`); }
      );
    } else {
      return this.firestoreService.add('coffees', coffee).then(
        () => onSuccess(true),
        (error) => { throw new Error(`Save Coffee Error: ${error}`); }
      );
    }
  }

  deleteOne(id: string, onSuccess: any): Promise<void> {
    return this.firestoreService.delete(`coffees/${id}`).then(
      () => onSuccess(true),
      (error) => { throw new Error(`Save Coffee Error: ${error}`); }
    );
  }

}
