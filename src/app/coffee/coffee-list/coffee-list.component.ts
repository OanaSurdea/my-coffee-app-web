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
  public coffeeList: Observable<Coffee[]>;

  constructor(
    private coffeeDataService: CoffeeDataService,
    private router: Router,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.populateCoffeeList();
  }

  public populateCoffeeList(): void {
    this.coffeeList = this.coffeeDataService.getCoffeeList();
  }

  public viewCoffeeDetails(id: string): void {
    this.router.navigate(['coffee', id, 'details']);
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
        .then(() => console.log('Coffee shared'))
        .catch((error) => console.log('Coffee share error', error));
    } else {
      const shareCoffeeURL = `whatsapp://send?text=${encodeURIComponent(shareCoffeeText)}`;
      location.href = shareCoffeeURL;
    }
  }
}
