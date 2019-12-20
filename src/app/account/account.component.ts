import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private account = {
    rib: '',
    amount: '',
    typeContrat: ''
  };
  accountId: number;
  height: number = $(window).height() - 64 - 220;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Creation_date', 'description', 'amount', 'active'];
  dataSource: any;
  ELEMENT_DATA: any = [];
  searchKey: string;
  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.accountId = this.route.snapshot.params.id;

    this.clientService.getTransactions(this.accountId).then(resp => {
      console.log(resp);
      // @ts-ignore
      this.ELEMENT_DATA = resp.transactions;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // @ts-ignore
      this.account.typeContrat = resp.account.typecontrat.name;
      // @ts-ignore
      this.account.rib = resp.account.rib;
      // @ts-ignore
      this.account.amount = resp.account.balance;

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
    //  this.router.navigateByUrl('/detail_client/' + row.id)
  }
}
