import {Purchase} from "./purchase";
import {Transaction} from "./transaction";

export interface TransactionVerification {
  id?: number,
  phoneNumber?: string,
  token?: string,
  countryCode?: string
  transaction?:Transaction
}
