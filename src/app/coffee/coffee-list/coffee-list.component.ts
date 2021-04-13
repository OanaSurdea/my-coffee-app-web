import { CoffeeTypeEnum } from './../../core/enums/coffee-type.enum';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';
import { CoffeeSortTypeMap } from './../../core/maps/coffee-sort-type.map';
import { CoffeeSortTypeEnum } from './../../core/enums/coffee-sort-type.enum';
import { GeolocationService } from './../../core/services/geolocation.service';
import { Router } from '@angular/router';
import { CoffeeDataService } from './../../core/services/coffee-data.service';
import { Component, OnInit } from '@angular/core';
import { Coffee } from 'src/app/core/models/coffee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'mca-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit {
  // List
  public coffeeList: Observable<Coffee[]>;

  // Sorting
  sortBy: CoffeeSortTypeEnum = CoffeeSortTypeEnum.DateCreated;
  sortByOptions: any = CoffeeSortTypeEnum;
  coffeeSortTypeMap: Map<CoffeeSortTypeEnum, SortDirectionEnum> = CoffeeSortTypeMap;

  constructor(
    private coffeeDataService: CoffeeDataService,
    private router: Router,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.populateCoffeeList();
  }

  public populateCoffeeList(): void {
    const direction = this._getSortDirectionBasedOn(this.sortBy);
    this.coffeeList = this.coffeeDataService.getOrderedCoffeeList(this.sortBy, direction);
  }

  public viewCoffeeDetails(id: string): void {
    this.router.navigate(['coffees', id]);
  }

  public openMaps(coffee: Coffee): void {
    const mapURL = this.geolocationService.getFormattedMapUrlFrom(coffee.cafeLocation);
    location.href = mapURL;
  }

  public shareCoffeeRating(coffee: Coffee): void {
    const shareCoffeeText = `I had this coffee at ${coffee.cafeName} and for me it's a ${coffee.rating}.`;

    if ('share' in navigator) {
      navigator.share({
          title: coffee.name,
          text: shareCoffeeText,
          url: window.location.href
        })
        // tslint:disable-next-line: no-console
        .then(() => console.info('Coffee shared'))
        .catch((error) => { throw new Error(`Coffee share Error: ${error}`); });
    } else {
      const shareCoffeeURL = `whatsapp://send?text=${encodeURIComponent(shareCoffeeText)}`;
      location.href = shareCoffeeURL;
    }
  }

  private _getSortDirectionBasedOn(key: CoffeeSortTypeEnum): SortDirectionEnum {
    return this.coffeeSortTypeMap.get(key);
  }
}
