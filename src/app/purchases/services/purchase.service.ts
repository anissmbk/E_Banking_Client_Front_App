import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiConfiguration} from "../../api-configuration";
import {Observable} from "rxjs";
import {Operator} from "../models/operator";
import {Purchase} from "../models/purchase";
import {PagePurchase} from "../models/page-purchase";

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



  constructor(private  httpClient: HttpClient,
              private configuration: ApiConfiguration) {
  }


  createPurchase(purchase: Purchase): Observable<Purchase> {
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.post<Purchase>(this.configuration.rootUrl + this.createUsingPost, purchase, {headers: headers});
    }
  }

  getPurchases(params: paramsUrl): Observable<PagePurchase> {
    let __params = new HttpParams().set('size', params.size.toString()).set( 'page', params.page.toString());
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


}

