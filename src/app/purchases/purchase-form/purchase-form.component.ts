import {Component, OnInit} from '@angular/core';
import {OperatorService} from "../services/operator.service";
import {PurchaseType} from "../models/purchaseType";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {

  public purchaseTypes: PurchaseType[];

  constructor(private operatorService: OperatorService) {
  }

  ngOnInit() {
    this.operatorService.getPurchaseTypes().subscribe(
      data => {
        this.purchaseTypes = data;
      }
    )
  }

}
