import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffee } from '../../coffee/models/coffee.model';
import { environment } from './../../../environments/environment.prod';
import { CoffeeListFilters } from './../../coffee/models/coffee-list-filters';
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

  getAllSorted(filters: CoffeeListFilters): Observable<Coffee[]> {
    return this.firestoreService.colWithIdsOrderBy$('coffees', filters.sortBy, filters.sortDirection);
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
