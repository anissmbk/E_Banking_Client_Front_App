import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';

@Component({
  selector: 'app-bad-transaction',
  templateUrl: './bad-transaction.component.html',
  styleUrls: ['./bad-transaction.component.scss']
})
export class BadTransactionComponent implements OnInit {


  height: number = $(window).height() - 64 - 220;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['creation_date', 'transaction_id' , 'amount'];
  dataSource: any;
  ELEMENT_DATA: any = [];
  searchKey: string;

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
// tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.clientService.getBadTransactions().then(resp => {
      // @ts-ignore
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      console.log(err);
    });
  }

  onsearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getRecord(row: any) {
    console.log(row);
    this.router.navigateByUrl('/badTransactionDetails/' + row.id);
  }

}
