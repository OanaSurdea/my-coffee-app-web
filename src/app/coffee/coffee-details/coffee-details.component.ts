import { CoffeeDataService } from './../../core/services/coffee-data.service';
import { GeolocationService } from './../../core/services/geolocation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Coffee } from 'src/app/core/models/coffee.model';
import { coffeeFormFieldConfig } from './coffee-details-form';

@Component({
  selector: 'mca-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent implements OnInit, OnDestroy {
  // Subscriptions
  routeSubscription: Subscription;
  coffeeRouteId: string;

  // Formly
  coffeeModel = new Coffee();
  coffeeForm: FormGroup = new FormGroup({});
  coffeeFormFields: FormlyFieldConfig[] = coffeeFormFieldConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coffeeDataService: CoffeeDataService,
    private geolocationService: GeolocationService,
  ) { }

  public ngOnInit(): void {
    this.subscribeToRoute();
    this.populateFormFields();
  }

  public subscribeToRoute(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.coffeeRouteId = params.get('id');
      },
      error: (error) => console.error(error)
    });
  }

  public populateFormFields(): void {
    this.coffeeDataService.getCoffee(this.coffeeRouteId).subscribe(
      (coffee: Coffee) => {
        if (coffee) { this.coffeeModel = coffee; }
      }
    );
  }

  public requestGeolocation(): void {
    const getLocation = (location) => {
      this.coffeeModel.cafeLocation.latitude = location?.latitude;
      this.coffeeModel.cafeLocation.longitude = location?.longitude;
    };

    const logError = (error) => console.error('Location Error: ', error);

    this.geolocationService.requestLocation(getLocation, logError);
  }

  public onCoffeeFormSubmit(coffeeModel: any): void {
    this.requestGeolocation();

    this.coffeeModel.id = this.coffeeRouteId;

    this.coffeeDataService.saveCoffeeEntry(coffeeModel, success => {
      if(success) {
        this.router.navigateByUrl('/');
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
