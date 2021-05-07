import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyPluginModule } from '../core/modules/formly-plugin.module';
import { MaterialUiModule } from '../core/modules/material-ui.module';
import { CoreModule } from './../core/modules/core.module';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { CoffeeCardComponent } from './coffee-list/coffee-card/coffee-card.component';
import { CoffeeListFiltersComponent } from './coffee-list/coffee-list-filters/coffee-list-filters.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeComponent } from './coffee.component';
import { CoffeeEffects } from './state/coffee.effects';
import { coffeeReducer } from './state/coffee.reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialUiModule,
    CoffeeRoutingModule,
    MaterialUiModule,

    FormlyPluginModule,

    EffectsModule.forFeature([CoffeeEffects]),
    StoreModule.forFeature('coffees', coffeeReducer),
    CoreModule,
  ],
  declarations: [
    CoffeeComponent,
    CoffeeListComponent,
    CoffeeDetailsComponent,
    CoffeeCardComponent,
    CoffeeListFiltersComponent
  ],
  exports: [
    MaterialUiModule,
    FormlyPluginModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeeModule { }
