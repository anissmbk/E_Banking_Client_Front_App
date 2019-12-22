import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "../services/purchase.service";
import {Purchase} from "../models/purchase";

@Component({
  selector: 'app-purchases-history',
  templateUrl: './purchases-history.component.html',
  styleUrls: ['./purchases-history.component.scss']
})
export class PurchasesHistoryComponent implements OnInit {

  purchases: Purchase[] = null;
  page = 1;
  pageSize = 20;
  totalCount: number;
  previousPage: any;

  constructor(private purchaseService: PurchaseService) {
    this.search();
  }

  ngOnInit() {
    //this.loadPurchases();
  }


  search() {
    this.page = 1;
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getPurchases({
      page: this.page - 1,
      size: this.pageSize,
    }).subscribe(data => {
      this.purchases = data.content;
      this.totalCount = data.totalElements;
      console.log(data);
    });
  }

}
