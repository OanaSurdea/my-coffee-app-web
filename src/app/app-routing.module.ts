import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  // Modules
  { path: 'coffee', loadChildren: () => import('./coffee/coffee.module').then(m => m.CoffeeModule) },

  // Redirects
  { path: '', redirectTo: 'coffee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
