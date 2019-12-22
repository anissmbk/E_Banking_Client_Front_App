import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operator} from "../models/operator";
import {ApiConfiguration} from "../../api-configuration";
import {PurchaseType} from "../models/purchaseType";

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  public getOperatorsUsingGet = '/operators';
  public getPurchaseTypesUsingGet = '/operators/purchase-types';

  constructor(private  httpClient: HttpClient,
              private configuration: ApiConfiguration) {
  }

  getOperators(): Observable<Operator[]> {
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.get<Operator[]>(this.configuration.rootUrl + this.getOperatorsUsingGet, {headers: headers});
    }
  }

  getPurchaseTypes(): Observable<PurchaseType[]> {
    let token = localStorage.getItem('token');
    if (token !== null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
      });
      return this.httpClient.get<PurchaseType[]>(this.configuration.rootUrl + this.getPurchaseTypesUsingGet, {headers: headers});
    }
  }

}
