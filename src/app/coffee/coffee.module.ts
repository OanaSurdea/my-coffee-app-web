import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialUiModule } from '../core/modules/material-ui.module';
import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeComponent } from './coffee.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { FormlyPluginModule } from '../core/modules/formly-plugin.module';


@NgModule({
  declarations: [
    CoffeeComponent,
    CoffeeListComponent,
    CoffeeDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialUiModule,
    CoffeeRoutingModule,

    FormlyPluginModule,
  ],
  exports: [
    MaterialUiModule,
    FormlyPluginModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoffeeModule { }
