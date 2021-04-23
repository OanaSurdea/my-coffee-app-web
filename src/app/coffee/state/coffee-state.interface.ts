import { IAppState } from 'src/app/core/state/app-state.interface';
import { CoffeeSortByEnum } from '../enums/coffee-sort-type.enum';
import { ICoffee } from '../interfaces/coffee.interface';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';

export interface ICoffeeState {
  selectedSortByOption: CoffeeSortByEnum;
  selectedSortDirectionOption: SortDirectionEnum;
  areCoffeesLoading: boolean;
  coffees$: ICoffee[];
  coffeesLoadError: string;
}

export interface IState extends IAppState {
  coffees: ICoffeeState;
}
