import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mca-coffee-details-location-form',
  templateUrl: './coffee-details-location-form.component.html',
  styleUrls: ['./coffee-details-location-form.component.scss']
})
export class CoffeeDetailsLocationFormComponent {
  @Input() public form: FormGroup = new FormGroup({});
  @Output() public geolocationGet: EventEmitter<null> = new EventEmitter();
  @Output() public geolocationReset: EventEmitter<null> = new EventEmitter();

  constructor() { }

  public requestGeolocation(): void {
    this.geolocationGet.emit();
  }

  public resetGeolocation(): void {
    this.geolocationReset.emit();
  }

}
