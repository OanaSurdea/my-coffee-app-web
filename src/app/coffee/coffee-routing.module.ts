import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeComponent } from './coffee.component';

export const coffeeRoutes: Routes = [
  // Routes
  { path: '', data: { name: 'List coffees' }, component: CoffeeListComponent },
  { path: 'add', data: { name: 'Add coffee' }, component: CoffeeDetailsComponent },
  { path: ':id', data: { name: 'View/Edit coffee' }, component: CoffeeDetailsComponent },

  // Redirects
  { path: '', component: CoffeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(coffeeRoutes)],
  exports: [RouterModule]
})
export class CoffeeRoutingModule { }
