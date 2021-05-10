import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mca-coffee-details-location-form',
  templateUrl: './coffee-details-location-form.component.html',
  styleUrls: ['./coffee-details-location-form.component.scss']
})
export class CoffeeDetailsLocationFormComponent {
  @Input() public form: FormGroup;
  @Output() public geolocationGet: EventEmitter<boolean> = new EventEmitter();
  @Output() public geolocationReset: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public requestGeolocation(): void {
    this.geolocationGet.emit(true);
  }

  public resetGeolocation(): void {
    this.geolocationReset.emit(true);
  }

}
