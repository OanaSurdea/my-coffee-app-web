import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeAgoPipe } from '../pipes/timeago.pipe';
import { StarRatingPipe } from './../pipes/star-rating.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TimeAgoPipe,
    StarRatingPipe
  ],
  exports: [
    CommonModule,
    TimeAgoPipe,
    StarRatingPipe
  ]
})
export class CoreModule { }
