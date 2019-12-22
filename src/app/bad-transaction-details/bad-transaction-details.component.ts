import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ClientService} from '../client_service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import Swal from "sweetalert2";

@Component({
  selector: 'app-bad-transaction-details',
  templateUrl: './bad-transaction-details.component.html',
  styleUrls: ['./bad-transaction-details.component.scss']
})
export class BadTransactionDetailsComponent implements OnInit {

  private transaction;
  transactionId: number;

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.transactionId = this.route.snapshot.params.id;

    this.clientService.getTransactionDetails(this.transactionId).then(resp => {
      console.log(resp);
      this.transaction = resp;
    }).catch(err => {
      console.log(err);
    });
  }

  validerTransaction() {
    this.clientService.validateTransaction(this.transactionId).then(resp => {
      Swal.fire({
        icon: 'success',
        title: 'success changes',
        text: resp.toString(),
      });
    }).catch(err => {
      console.log(err);
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'error serveur',
      });
    });
  }

  removeTransaction() {
    this.clientService.removeTransaction(this.transactionId).then(resp => {
      Swal.fire({
        icon: 'success',
        title: 'success remove',
        text: resp.toString(),
      });
    }).catch(err => {
      console.log(err);
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'error serveur',
      });
    });
  }
}
