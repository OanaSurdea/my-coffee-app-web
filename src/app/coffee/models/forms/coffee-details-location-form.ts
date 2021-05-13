import { ICoffeeDetailsLocationForm } from '../../interfaces';

export class CoffeeDetailsLocationForm implements ICoffeeDetailsLocationForm {
  name: string;
  address: string;
  city: string;
  latitude?: string;
  longitude?: string;

  constructor(
    name = '',
    address = '',
    city = '',
    latitude = null,
    longitude = null,
  ) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
