import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiFilterPipeModule } from '@taiga-ui/cdk/pipes';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,

  TuiRootModule,
  TuiSvgModule
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiBadgedContentModule,

  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,


  TuiSelectModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';

@NgModule({

  imports: [
    CommonModule,
    TuiRootModule,

    // Components
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiGroupModule,

    // Form
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiHintModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextAreaModule,

    // Tools
    TuiFilterPipeModule,

    // Icons
    TuiSvgModule
  ],
  exports: [
    TuiRootModule,

    // Components
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiGroupModule,

    // Form
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiHintModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextAreaModule,

    // Tools
    TuiFilterPipeModule,

    // Icons
    TuiSvgModule
  ]
})
export class TaigaUiModule { }
