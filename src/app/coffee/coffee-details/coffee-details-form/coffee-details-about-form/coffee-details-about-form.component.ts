import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormOption } from 'src/app/core/interfaces';
import { CoffeeTypeEnum } from './../../../enums/coffee-type.enum';

@Component({
  selector: 'mca-coffee-details-about-form',
  templateUrl: './coffee-details-about-form.component.html',
  styleUrls: ['./coffee-details-about-form.component.scss'],
})
export class CoffeeDetailsAboutFormComponent {
  @Input() public readonly form: FormGroup;
  @Input() public readonly coffeeTypeOptions: IFormOption<CoffeeTypeEnum, string>[];

  @Output() public imageUploaded: EventEmitter<File> = new EventEmitter();

  constructor() { }

  getImageUrl(event: File): void {
    this.imageUploaded.emit(event);
  }

}
