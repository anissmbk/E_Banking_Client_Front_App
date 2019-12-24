import {Purchase} from "./purchase";

export interface PurchaseVerification {
  id?: number,
  phoneNumber?: string,
  token?: string,
  countryCode?: string
  purchase?:Purchase
}
