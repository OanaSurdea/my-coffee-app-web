import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TuiPluralize } from '@taiga-ui/core';

@Component({
  selector: 'mca-coffee-details-rating-form',
  templateUrl: './coffee-details-rating-form.component.html',
  styleUrls: ['./coffee-details-rating-form.component.scss']
})
export class CoffeeDetailsRatingFormComponent implements OnInit {
  @Input() public form: FormGroup;

  public showTasteRating: boolean = false;

  readonly pluralize: TuiPluralize = ['star', 'stars', 'stars'];

  constructor() { }

  ngOnInit(): void {
  }

}
