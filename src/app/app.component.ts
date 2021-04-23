import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SwPush, SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { interval, Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Component({
  selector: 'mca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'My Coffee App';
  // Subscriptions
  swCheckForUpdateSubscription: Subscription;
  swUpdatesSubscription: Subscription;
  swPromptUpdateSubscription: Subscription;
  swPromptInstallSubscription: Subscription;

  isAppOffline: boolean;
  routeName: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private swUpdates: SwUpdate,
    private swPush: SwPush,
  ) {
    if (this.swUpdates.isEnabled) {
      this.swCheckForUpdateSubscription = interval(6 * 60 * 60).subscribe(() => swUpdates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public ngOnInit(): void {
    this.checkNetworkConnection();
    this.getRouteName();
    this.inviteUserToInstallApp();
  }

  private getRouteName(): void {
    this.routeName = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data),
      map(data => data.hasOwnProperty('name') ? data.name : null),
    );
  }

  public subscribeForPushNotifications(): void {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        this.swPush.requestSubscription({ serverPublicKey: environment.serverPublicKey })
          .then(res => console.log(res));
      }
    });
  }

  public checkForUpdates(): void {
    this.swUpdatesSubscription = this.swUpdates.available
      .subscribe((event: UpdateAvailableEvent) => this.promptServiceWorkerUpdate(event));
  }

  private promptServiceWorkerUpdate(event: UpdateAvailableEvent): void {
    if (event.current.appData !== event.available.appData) {
      const snackBar = this.snackBar.open('There is an update available', 'Install Now', { duration: 4000 });

      this.swPromptUpdateSubscription = snackBar.onAction().subscribe(() => {
        console.log('Updating to new version.');
        this.swUpdates.activateUpdate()
          .then(() => document.location.reload());
      });
    }
  }

  private inviteUserToInstallApp(): void {
    // Check if in the browser
    if ((navigator as any).standalone == false) {
      this.snackBar.open('You can add this PWA to your Home Screen just like a regular app.', null, { duration: 3000 });
      // Check if it's not IOS
    } else if ((navigator as any).standalone == undefined) {
      // Check if in the browser
      if (window.matchMedia('display-mode: browser').matches) {
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();

          const snackBarInstance = this.snackBar.open('Do you want install this App?', 'Install', { duration: 3000 });

          this.swPromptInstallSubscription = snackBarInstance
            .onAction().subscribe(() => {
              (event as any).prompt();
              (event as any).userChoice.then(result => {
                if (result.outcome == 'dismissed') {
                  // TODO: Track no installation
                } else {
                  // TODO: Track installation
                }
              });
            });
        });
      }
    }
  }

  private checkNetworkConnection(): void {
    this.isAppOffline = navigator.onLine ? false : true;
  }

  ngOnDestroy(): void {
    this.swCheckForUpdateSubscription?.unsubscribe();
    this.swUpdatesSubscription?.unsubscribe();
    this.swPromptUpdateSubscription?.unsubscribe();
    this.swPromptInstallSubscription?.unsubscribe();
  }

}
