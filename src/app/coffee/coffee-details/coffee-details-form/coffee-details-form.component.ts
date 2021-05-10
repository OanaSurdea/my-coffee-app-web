import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormOption } from 'src/app/core/interfaces';
import { CoffeeTypeFormOptions } from 'src/app/core/maps';
import { GeolocationService } from 'src/app/core/services';
import { CoffeeTypeEnum } from '../../enums';
import { Coffee, TasteRating } from '../../models';
import { Cafe } from './../../../core/models/cafe';
import { CoffeeDetails } from './../../models/coffee-details';

@Component({
  selector: 'mca-coffee-details-form',
  templateUrl: './coffee-details-form.component.html',
  styleUrls: ['./coffee-details-form.component.scss']
})
export class CoffeeDetailsFormComponent implements OnChanges {
  mainForm: FormGroup;

  // About-coffee form
  aboutForm: FormGroup;
  coffeeTypeOptions: IFormOption<CoffeeTypeEnum, string>[] = CoffeeTypeFormOptions;
  locationForm: FormGroup;
  ratingForm: FormGroup;

  @Input() coffee: Coffee;
  @Output() update: EventEmitter<Coffee> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private geolocationService: GeolocationService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.coffee.previousValue !== changes.coffee.currentValue) {
      this.initMainForm();
      this.populateForms();
    }
  }

  private initMainForm(): void {
    this.aboutForm = this.fb.group(new CoffeeDetails());
    this.locationForm = this.fb.group(new Cafe());
    this.ratingForm = this.fb.group(new TasteRating());

    this.mainForm = this.fb.group({
      details: this.aboutForm,
      location: this.locationForm,
      rating: this.ratingForm,
    });
  }

  private populateForms(): void {
    this.aboutForm.patchValue(this.coffee.details);
    this.locationForm.patchValue(this.coffee.cafe);
    this.ratingForm.patchValue(this.coffee.tasteRating);

    this.mainForm.patchValue(this.coffee);
  }

  public uploadPicture(): void {

  }

  public requestGeolocation(): void {
    const getLocation = (location) => {
      this.coffee.cafe.latitude = location?.latitude;
      this.coffee.cafe.longitude = location?.longitude;
      this.locationForm.patchValue(this.coffee.cafe);
    };
    const logError = (error) => console.error('Location Error: ', error);

    this.geolocationService.requestLocation(getLocation, logError);
  }

  public resetGeolocation(): void {
    this.coffee.cafe.latitude = null;
    this.coffee.cafe.longitude = null;
    this.locationForm.patchValue(this.coffee.cafe);
  }

  public submitForm(): void {
    const updatedCoffee = Object.assign(this.coffee, this.mainForm.value);
    this.update.emit(updatedCoffee);
  }


  public resetForm(): void {
    this.mainForm.reset();
  }

}
