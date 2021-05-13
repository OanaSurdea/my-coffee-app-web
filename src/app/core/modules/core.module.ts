import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { AvatarUploadComponent } from '../components/file-uploaders/avatar-upload/avatar-upload.component';
import { TimeAgoPipe } from '../pipes/timeago.pipe';
import { StarRatingPipe } from './../pipes/star-rating.pipe';
import { TaigaUiModule } from './taiga-ui/taiga-ui.module';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    // UI
    TaigaUiModule
  ],
  declarations: [
    // Components
    DeleteDialogComponent,
    AvatarUploadComponent,

    // Pipes
    TimeAgoPipe,
    StarRatingPipe,
  ],
  exports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    // UI
    TaigaUiModule,

    // Components
    DeleteDialogComponent,
    AvatarUploadComponent,

    // Pipes
    TimeAgoPipe,
    StarRatingPipe,
  ]
})
export class CoreModule { }
