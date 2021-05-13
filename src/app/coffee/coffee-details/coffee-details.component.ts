import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core/components';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subscription } from 'rxjs';
import { CoffeeDataService } from 'src/app/core/services';
import { Coffee } from '../models';
import { DeleteDialogComponent } from './../../core/components/dialogs/delete-dialog/delete-dialog.component';

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

  private readonly dialog = this.dialogService.open<boolean>(
    new PolymorpheusComponent(DeleteDialogComponent, this.injector),
    { dismissible: true, label: 'Are yout sure?' }
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coffeeDataService: CoffeeDataService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
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

  public saveCoffee(event: Coffee): void {
    event.id = this.coffeeRouteId;

    this.coffeeDataService.saveOne(event, success => {
      if (success) {
        const message = this.coffeeRouteId ? 'The coffee was updated' : 'The new coffee was added';

        const notificationSubscription = this.notificationsService.show('Success', {
          label: message,
          status: TuiNotification.Success,
          autoClose: true,
        }).subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err),
          complete: () => this.router.navigateByUrl('/coffees')
        });

        this.subscriptions.push(notificationSubscription);
      }
    });
  }

  public deleteCoffee(): void {
    const dialogSubscription = this.dialog.subscribe({
      next: deleteConfirmed => {
        console.log('Dialog emitted data = ' + deleteConfirmed);
        if (deleteConfirmed) {
          this.coffeeDataService
            .deleteOne(this.coffeeRouteId, () => console.log('Coffee deleted successfully.'))
            .then(() => {
              this.notificationsService
                .show(
                  'Success', {
                  label: 'The coffee was deleted',
                  status: TuiNotification.Success,
                  autoClose: true,
                }).subscribe({
                  next: (res) => console.log(res),
                  error: (err) => console.log(err),
                  complete: () => this.router.navigateByUrl('/coffees')
                });

            })
            .catch((error) => {
              this.notificationsService.show(
                'Error',
                {
                  label: 'The coffee was not deleted',
                  status: TuiNotification.Error,
                  autoClose: true,
                }).subscribe({
                  next: (res) => console.log(res),
                  error: (err) => console.log(err),
                  complete: () => this.router.navigateByUrl('/coffees')
                });
            });
        }
      },
      complete: () => {
        console.log('Dialog closed');
      }
    })

    this.subscriptions.push(dialogSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s?.unsubscribe());
  }
}
