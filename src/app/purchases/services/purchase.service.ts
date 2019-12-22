import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConfiguration} from "../../api-configuration";
import {Observable} from "rxjs";
import {Operator} from "../models/operator";
import {Purchase} from "../models/purchase";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public createUsingPost = "/purchase/add";

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
}
