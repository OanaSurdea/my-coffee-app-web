import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormOption } from 'src/app/core/interfaces';
import { CoffeeTypeEnum } from './../../../enums/coffee-type.enum';

@Component({
  selector: 'mca-coffee-details-about-form',
  templateUrl: './coffee-details-about-form.component.html',
  styleUrls: ['./coffee-details-about-form.component.scss'],
})
export class CoffeeDetailsAboutFormComponent {
  @Input() public form: FormGroup;

  @Input() public readonly coffeeTypeOptions: IFormOption<CoffeeTypeEnum, string>[];

  constructor() { }


}
