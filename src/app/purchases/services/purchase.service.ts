import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiConfiguration} from "../../api-configuration";
import {Observable} from "rxjs";
import {Operator} from "../models/operator";
import {Purchase} from "../models/purchase";
import {PagePurchase} from "../models/page-purchase";
import {PhoneVerification} from "../models/phoneVerification";
import {PurchaseVerification} from "../models/purchaseVerification";
import {PhoneVerificationStart} from "../models/phoneVerificationStart";

export interface paramsUrl {
  size?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public createUsingPost = "/purchase/add";
  public getPurchasesUsingGet = "/purchase";
  public phoneVerificationPost = "/api/phone-verification/start";


  constructor(private  httpClient: HttpClient,
              private configuration: ApiConfiguration) {
  }


  createPurchase(purchaseVerification: PurchaseVerification): Observable<PurchaseVerification> {
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.post<PurchaseVerification>(this.configuration.rootUrl + this.createUsingPost, purchaseVerification, {headers: headers});
    }
  }

  getPurchases(params: paramsUrl): Observable<PagePurchase> {
    let __params = new HttpParams().set('size', params.size.toString()).set('page', params.page.toString());
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.get<PagePurchase>(this.configuration.rootUrl + this.getPurchasesUsingGet, {
        headers: headers,
        params: __params
      });
    }
  }

  verifyPurchase(phoneVerificationStart: PhoneVerificationStart): Observable<PhoneVerificationStart> {
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.post<PhoneVerificationStart>(this.configuration.rootUrl + this.phoneVerificationPost, phoneVerificationStart, {headers: headers});
    }
  }


}

