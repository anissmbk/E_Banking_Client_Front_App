/* tslint:disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import {Purchase} from "./purchase";
export interface PagePurchase {
  numberOfElements?: number;
  content?: Array<Purchase>;
  first?: boolean;
  last?: boolean;
  number?: number;
  empty?: boolean;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
