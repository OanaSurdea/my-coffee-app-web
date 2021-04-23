import { SortDirectionEnum } from 'src/app/core/enums';
import { IAppState } from 'src/app/core/state';
import { CoffeeSortByEnum } from '../enums';
import { ICoffee } from '../interfaces';

export interface ICoffeeState {
  selectedSortByOption: CoffeeSortByEnum;
  selectedSortDirectionOption: SortDirectionEnum;
  // selectedLayoutOption: ListLayoutEnum;
  areCoffeesLoading: boolean;
  coffees$: ICoffee[];
  coffeesLoadError: string;
}

export interface IState extends IAppState {
  coffees: ICoffeeState;
}
