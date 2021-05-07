import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiFilterPipeModule } from '@taiga-ui/cdk/pipes';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLinkModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiSvgModule
} from '@taiga-ui/core';
import {
  TuiActionModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';

@NgModule({

  imports: [
    CommonModule,
    TuiRootModule,

    // Components
    TuiActionModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiGroupModule,
    TuiHintModule,
    TuiInputModule,
    TuiIslandModule,
    TuiLinkModule,
    TuiMarkerIconModule,
    TuiFilterPipeModule,
    TuiNotificationsModule,

    // Icons
    TuiSvgModule

  ],
  exports: [
    TuiRootModule,

    // Components
    TuiActionModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiGroupModule,
    TuiHintModule,
    TuiInputModule,
    TuiIslandModule,
    TuiLinkModule,
    TuiMarkerIconModule,
    TuiFilterPipeModule,
    TuiNotificationsModule,

    // Icons
    TuiSvgModule
  ]
})
export class TaigaUiModule { }
