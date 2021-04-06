import { CoffeeDataService } from './../../core/services/coffee-data.service';
import { GeolocationService } from './../../core/services/geolocation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Coffee } from 'src/app/core/models/coffee.model';
import { coffeeFormFieldConfig } from './coffee-details-form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mca-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent implements OnInit, OnDestroy {
  // Subscriptions
  routeSubscription: Subscription;
  coffeeDataSubscription: Subscription;
  dialogSubscription: Subscription;
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    this.coffeeDataSubscription = this.coffeeDataService.getCoffee(this.coffeeRouteId).subscribe(
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

  public deleteCoffeeEntry(templateRef): void {
    const dialog = this.dialog.open(templateRef);

    this.dialogSubscription = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.coffeeDataService.deleteCoffeeEntry(this.coffeeRouteId, (ress) => result = ress).then(
          () => {
            this.snackBar.open('Coffee deleted succesfully.', 'Close', { duration: 650 });
            this.router.navigateByUrl('/coffees');
          },
          (error) => {
            this.snackBar.open('Error. Coffee could not be deleted.', 'Close', { duration: 650 });
          }
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.coffeeDataSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }
}
