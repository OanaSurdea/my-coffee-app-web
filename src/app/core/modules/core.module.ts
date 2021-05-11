import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { TimeAgoPipe } from '../pipes/timeago.pipe';
import { StarRatingPipe } from './../pipes/star-rating.pipe';
import { TaigaUiModule } from './taiga-ui/taiga-ui.module';

@NgModule({
  imports: [
    CommonModule,

    // UI
    TaigaUiModule
  ],
  declarations: [
    // Components
    DeleteDialogComponent,

    // Pipes
    TimeAgoPipe,
    StarRatingPipe,
  ],
  exports: [
    CommonModule,

    // UI
    TaigaUiModule,

    // Components
    DeleteDialogComponent,

    // Pipes
    TimeAgoPipe,
    StarRatingPipe,
  ]
})
export class CoreModule { }
