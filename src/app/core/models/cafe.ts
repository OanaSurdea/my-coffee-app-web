import { ICafe } from '../interfaces/cafe.interface';

export class Cafe implements ICafe {
  name: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;

  constructor(
    name = '',
    address = '',
    city = '',
  ) {
    this.name = name;
    this.address = address;
    this.city = city;
  }
}
