import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mca-coffee-details-location-form',
  templateUrl: './coffee-details-location-form.component.html',
  styleUrls: ['./coffee-details-location-form.component.scss']
})
export class CoffeeDetailsLocationFormComponent implements OnInit {
  @Input() public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
