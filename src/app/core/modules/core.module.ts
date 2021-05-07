import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    TimeAgoPipe,
    StarRatingPipe
  ],
  exports: [
    // UI
    TaigaUiModule,

    CommonModule,
    TimeAgoPipe,
    StarRatingPipe
  ]
})
export class CoreModule { }
