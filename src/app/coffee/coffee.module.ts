import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyPluginModule } from '../core/modules/formly-plugin.module';
import { MaterialUiModule } from '../core/modules/material-ui.module';
import { CoreModule } from './../core/modules/core.module';
import { CoffeeDetailsAboutFormComponent } from './coffee-details/coffee-details-form/coffee-details-about-form/coffee-details-about-form.component';
import { CoffeeDetailsFormComponent } from './coffee-details/coffee-details-form/coffee-details-form.component';
import { CoffeeDetailsLocationFormComponent } from './coffee-details/coffee-details-form/coffee-details-location-form/coffee-details-location-form.component';
import { CoffeeDetailsRatingFormComponent } from './coffee-details/coffee-details-form/coffee-details-rating-form/coffee-details-rating-form.component';
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
    CoffeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    MaterialUiModule,
    FormlyPluginModule,

    // NgRx
    EffectsModule.forFeature([CoffeeEffects]),
    StoreModule.forFeature('coffees', coffeeReducer),
  ],
  declarations: [
    CoffeeComponent,

    // Coffee List
    CoffeeListComponent,
    CoffeeCardComponent,
    CoffeeListFiltersComponent,

    // Coffee Details Form
    CoffeeDetailsComponent,
    CoffeeDetailsFormComponent,
    CoffeeDetailsAboutFormComponent,
    CoffeeDetailsLocationFormComponent,
    CoffeeDetailsRatingFormComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
    FormlyPluginModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoffeeModule { }
