import { CoffeeTypeEnum } from '../../enums';

export interface ICoffeeDetailsAboutForm {
  name: string;
  type: CoffeeTypeEnum;
  imageUrl?: string;
  notes?: string;

}
