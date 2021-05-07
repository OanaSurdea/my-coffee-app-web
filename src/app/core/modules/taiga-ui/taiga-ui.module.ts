import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiDialogModule, TuiGroupModule, TuiNotificationsModule, TuiRootModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiActionModule, TuiMarkerIconModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    CommonModule,
    TuiRootModule,

    // Components
    TuiButtonModule,
    TuiGroupModule,
    TuiNotificationsModule,
    TuiDialogModule,
    TuiActionModule,
    TuiMarkerIconModule,

    // Icons
    TuiSvgModule

  ],
  exports: [
    TuiRootModule,

    // Components
    TuiButtonModule,
    TuiGroupModule,
    TuiNotificationsModule,
    TuiDialogModule,
    TuiActionModule,
    TuiMarkerIconModule,

    // Icons
    TuiSvgModule
  ]
})
export class TaigaUiModule { }
