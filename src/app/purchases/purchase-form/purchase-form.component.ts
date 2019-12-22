import {Component, OnInit} from '@angular/core';
import {OperatorService} from "../services/operator.service";
import {PurchaseType} from "../models/purchaseType";
import {ClientService} from "../../client_service/client.service";
import {Purchase} from "../models/purchase";
import {PurchaseService} from "../services/purchase.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {

  public purchaseTypes: PurchaseType[];
  public accounts: any;
  private id;
  private purchase: Purchase = {};

  constructor(private operatorService: OperatorService,
              private clientService: ClientService,
              private purchaseService: PurchaseService) {
  }


  ngOnInit() {
    this.operatorService.getPurchaseTypes().subscribe(
      data => {
        this.purchaseTypes = data;
      }
    );
    this.id = JSON.parse(localStorage.getItem('user')).id;
    this.clientService.getClient(this.id).then(resp => {
      // @ts-ignore
      this.accounts = resp.account;
      // @ts-ignore
      this.recipients = resp.beneficiaries;
    }).catch(err => {
      console.log(err);
    });
  }

  create() {
    console.log(this.purchase);
    this.purchaseService.createPurchase(this.purchase).subscribe(result => {
        console.log(result);
    })
  }


}
