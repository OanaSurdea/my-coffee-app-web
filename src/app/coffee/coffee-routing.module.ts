import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './coffee.component';

export const coffeeRoutes: Routes = [
  // Routes
  { path: ':id/details', data: { name: 'View coffee' }, component: CoffeeDetailsComponent },
  { path: 'list', data: { name: 'List coffees' }, component: CoffeeListComponent },
  { path: 'add', data: { name: 'Add coffee' }, component: CoffeeDetailsComponent },

  // Redirects
  { path: ':id', redirectTo: ':id/details', pathMatch: 'full' },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: CoffeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(coffeeRoutes)],
  exports: [RouterModule]
})
export class CoffeeRoutingModule { }
