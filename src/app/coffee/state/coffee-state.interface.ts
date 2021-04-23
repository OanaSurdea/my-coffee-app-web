import { IAppState } from 'src/app/core/state';
import { CoffeeSortByEnum } from '../enums';
import { ICoffee } from '../interfaces';
import { ListLayoutEnum, SortDirectionEnum } from './../../core/enums';

export interface ICoffeeState {
  selectedSortByOption: CoffeeSortByEnum;
  selectedSortDirectionOption: SortDirectionEnum;
  selectedLayoutOption: ListLayoutEnum;

  areCoffeesLoading: boolean;
  coffees$: ICoffee[];
  coffeesLoadError: string;
}

export interface IState extends IAppState {
  coffees: ICoffeeState;
}
