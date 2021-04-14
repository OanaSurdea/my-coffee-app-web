import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  // Modules
  { path: 'coffees', loadChildren: () => import('./coffee/coffee.module').then(m => m.CoffeeModule) },

  // Redirects
  { path: '', redirectTo: 'coffees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
