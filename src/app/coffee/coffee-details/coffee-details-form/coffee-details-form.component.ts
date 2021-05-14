import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormOption } from 'src/app/core/interfaces';
import { CoffeeTypeFormOptions } from 'src/app/core/maps';
import { Cafe } from 'src/app/core/models';
import { GeolocationService } from 'src/app/core/services';
import { CoffeeTypeEnum } from '../../enums';
import { Coffee, CoffeeDetails, TasteRating } from '../../models';

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
  @Input() coffeeId: string;

  @Output() coffeeUpdate: EventEmitter<Coffee> = new EventEmitter();
  @Output() imageUpdate: EventEmitter<File> = new EventEmitter();
  @Output() delete: EventEmitter<null> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
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
      tasteRating: this.ratingForm,
    });

    this.initFormValidationRules();
  }

  private initFormValidationRules(): void {
    // About/details
    this.aboutForm.get('name').setValidators([Validators.required]);
    this.aboutForm.get('type').setValidators([Validators.required]);

    // Location/cafe
    this.locationForm.get('name').setValidators([Validators.required]);
    this.locationForm.get('address').setValidators([Validators.required]);
    this.locationForm.get('city').setValidators([Validators.required]);

    // Rating
    this.ratingForm.get('overall').setValidators([Validators.required]);
  }

  private populateForms(): void {
    this.locationForm.patchValue(this.coffee.cafe);
    this.aboutForm.patchValue(this.coffee.details);
    this.ratingForm.patchValue(this.coffee.tasteRating);

    this.mainForm.patchValue(this.coffee);
  }

  public uploadPicture(): void {

  }

  public requestGeolocation(): void {
    const getLocation = (location) => {
      this.coffee.cafe.latitude = location?.latitude;
      this.coffee.cafe.longitude = location?.longitude;
      this.locationForm.get('latitude').patchValue(this.coffee.cafe.latitude);
      this.locationForm.get('longitude').patchValue(this.coffee.cafe.longitude);
    };
    const logError = (error) => console.error('Location Error: ', error);

    this.geolocationService.requestLocation(getLocation, logError);
  }

  public resetGeolocation(): void {
    this.coffee.cafe.latitude = null;
    this.coffee.cafe.longitude = null;
    this.locationForm.get('latitude').patchValue(this.coffee.cafe.latitude);
    this.locationForm.get('longitude').patchValue(this.coffee.cafe.longitude);
  }

  public submitForm(): void {
    this.mainForm.markAllAsTouched();
    this.mainForm.updateValueAndValidity();
    this.cdRef.detectChanges();

    if (this.mainForm.valid) {
      const updatedCoffee = Object.assign(this.coffee, this.mainForm.value);
      this.coffeeUpdate.emit(updatedCoffee);
    }
  }

  public uploadImage(event: File): void {
    this.mainForm.markAllAsTouched();
    this.mainForm.updateValueAndValidity();
    this.cdRef.detectChanges();

    if (this.mainForm.valid && event) {
      this.imageUpdate.emit(event);
    }
  }

  public deleteCoffee(): void {
    this.delete.emit();
  }

  public resetForm(): void {
    this.aboutForm.reset();
    this.locationForm.reset();
    this.ratingForm.reset(this.coffee.tasteRating);
  }

}
