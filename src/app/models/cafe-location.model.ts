import { ICafeLocation } from './cafe-location.interface';

export class CafeLocation implements ICafeLocation {
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;

  constructor(values?: ICafeLocation) {
    Object.assign(this, values);
  }
}
