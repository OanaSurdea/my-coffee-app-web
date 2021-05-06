import { IAppState } from 'src/app/core/state';
import { ICoffee } from '../interfaces';
import { ICoffeeListFilters } from '../interfaces/coffee-list-filters.interface';
import { ListLayoutEnum } from './../../core/enums';

export interface ICoffeeState {
  filters: ICoffeeListFilters;
  listLayout: ListLayoutEnum;

  areCoffeesLoading: boolean;
  coffees$: ICoffee[];
  coffeesLoadError: string;
}

export interface IState extends IAppState {
  coffees: ICoffeeState;
}
