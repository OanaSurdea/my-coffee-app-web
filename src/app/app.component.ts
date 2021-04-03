import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'mca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Coffee App';
  // Subscriptions
  routeSubscription: Subscription;

  routeName: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.getRouteName();
    this.inviteUserToInstallApp();
  }

  public getRouteName(): void {
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

          snackBarInstance.onAction().subscribe(() => {
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

}
