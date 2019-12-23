import {Component, OnInit} from '@angular/core';
import {OperatorService} from "../services/operator.service";
import {PurchaseType} from "../models/purchaseType";
import {ClientService} from "../../client_service/client.service";
import {Purchase} from "../models/purchase";
import {PurchaseService} from "../services/purchase.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

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
  private operator: string;
  purchaseForm: FormGroup;

  constructor(private operatorService: OperatorService,
              private clientService: ClientService,
              private purchaseService: PurchaseService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }


  ngOnInit() {

    this.purchaseForm = this.formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.pattern('[0]{1}[5-6]{1}[0-9]{8}'),
        Validators.required])],
      rib: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
    }, {});

    this.route.paramMap.subscribe(params =>
      this.operator = params.get('operator')
    )

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

    if (this.purchaseForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid!!!',
      });
      return;
    }

    this.purchase.operator = this.operator;
    this.purchaseService.createPurchase(this.purchase).subscribe(result => {
      console.log(result);
      
    }, error => {
      console.log(error.error);
      if (error.error === "somethings is wrong !!") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        })
      } else if (error.error === "your balance is insufficient") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        })
      }
      ;
    });
  }


}
