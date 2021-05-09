import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoffeeDataService, GeolocationService } from 'src/app/core/services';
import { Coffee } from '../models';

@Component({
  selector: 'mca-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss'],
})
export class CoffeeDetailsComponent implements OnInit, OnDestroy {
  // Subscriptions
  subscriptions: Subscription[] = [];
  coffeeRouteId: string;

  // Formly
  coffee = new Coffee();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coffeeDataService: CoffeeDataService,
    private geolocationService: GeolocationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.subscribeToRoute();
    this.getCoffeeData();
  }

  public subscribeToRoute(): void {
    const routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.coffeeRouteId = params.get('id');
      },
      error: (error) => console.error(error)
    });

    this.subscriptions.push(routeSubscription);
  }



  public getCoffeeData(): void {
    const coffeeDataSubscription = this.coffeeDataService
      .getOne(this.coffeeRouteId)
      .subscribe((coffee: Coffee) => {
        if (coffee) {
          this.coffee = coffee;
        }
      });

    this.subscriptions.push(coffeeDataSubscription);
  }



  public requestGeolocation(): void {
    // const getLocation = (location) => {
    //   this.coffee.cafeLocation.latitude = location?.latitude;
    //   this.coffee.cafeLocation.longitude = location?.longitude;
    // };

    // const logError = (error) => console.error('Location Error: ', error);

    // this.geolocationService.requestLocation(getLocation, logError);
  }

  public deleteOne(templateRef): void {
    // const dialog = this.dialog.open(templateRef);

    // const dialogSubscription = dialog
    //   .afterClosed()
    //   .subscribe((result) => {
    //     if (result) {
    //       this.coffeeDataService
    //         .deleteOne(this.coffeeRouteId, (ress) => result = ress)
    //         .then(
    //           () => {
    //             this.snackBar.open('Coffee deleted succesfully.', 'Close', { duration: 650 });
    //             this.router.navigateByUrl('/coffees');
    //           },
    //           (error) => {
    //             this.snackBar.open('Error. Coffee could not be deleted.', 'Close', { duration: 650 });
    //           }
    //         );
    //     }
    //   });

    // this.subscriptions.push(dialogSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s?.unsubscribe());
  }
}
