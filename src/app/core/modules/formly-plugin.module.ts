import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

@NgModule({
  imports: [
    CommonModule,

    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
  ],
  exports: [
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormlyPluginModule { }
