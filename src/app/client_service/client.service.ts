import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ApiService} from '../services/api.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiService: ApiService, private authService: AuthService) {
  }


  getTransactions(id: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.get('/account?id=' + id, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }


  getClient(id: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.get('/client/getClient?id=' + id, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  createRecipient(recipient: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.post('/client/createRecipient', recipient, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  createTransaction(transaction: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.post('/transaction/createTransaction', transaction, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  // meryem
  getBadTransactions() {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.get('/badTransactions', {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  getTransactionDetails(id: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.get('/transaction_details?id=' + id, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  validateTransaction(id: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.post('/transaction_manager/valide_transaction', id, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }

  removeTransaction(id: any) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');
      if (token !== null) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.substring(1, token.length - 1)
        });
        this.apiService.post('/transaction_manager/remove_transaction', id, {headers: headers}).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
      } else {
        this.authService.authenticationState.next(false);
      }
    });
  }
}
