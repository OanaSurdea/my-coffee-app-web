import { ICafeLocation } from '../interfaces/cafe-location.interface';

export class CafeLocation implements ICafeLocation {
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;

  constructor(
    address = '',
    city = '',
    latitude = null,
    longitude = null,
  ) {
    this.address = address;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
