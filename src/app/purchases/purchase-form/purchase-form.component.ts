import {Component, OnInit} from '@angular/core';
import {OperatorService} from "../services/operator.service";
import {PurchaseType} from "../models/purchaseType";
import {ClientService} from "../../client_service/client.service";
import {Purchase} from "../models/purchase";
import {PurchaseService} from "../services/purchase.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {PhoneVerification} from "../models/phoneVerification";
import {PhoneVerificationStart} from "../models/phoneVerificationStart";
import {PurchaseVerification} from "../models/purchaseVerification";

declare var $: any;

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
  private purchaseForm: FormGroup;
  private phoneVerificationStart: PhoneVerificationStart = {};
  private purchaseVerification: PurchaseVerification = {}
  private code: string;

  constructor(private operatorService: OperatorService,
              private clientService: ClientService,
              private purchaseService: PurchaseService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }


  ngOnInit() {

    this.purchaseForm = this.formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.pattern('[0]{1}[5-6]{1}[0-9]{8}'),
        Validators.required])],
      rib: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      code: ['', []]
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


    showModal() {
      if (this.purchaseForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Champs Invalid!!!',
        });
        return;
      };
      $('#verifyModal').modal("show");
      this.verify();
    }

    verify() {

      this.phoneVerificationStart.countryCode = "212";
      this.phoneVerificationStart.via = "sms";
      this.phoneVerificationStart.phoneNumber = this.purchase.phoneNumber;
      this.purchaseService.verifyPurchase(this.phoneVerificationStart).subscribe(result => {

      })
    }


  create() {
    $('.preloader').fadeIn();
    this.purchase.operator = this.operator;
    this.purchaseVerification.purchase = this.purchase;
    this.purchaseVerification.countryCode = "212";
    this.purchaseVerification.phoneNumber = this.purchase.phoneNumber;
    this.purchaseVerification.token = this.code;
    this.purchaseService.createPurchase(this.purchaseVerification).subscribe(result => {
      console.log(result);
      $('.preloader').fadeOut();
      $('#verifyModal').modal("hide");
      Swal.fire({
        icon: 'success',
        title: 'success Recharge',
        text: 'success Recharge :^D',
        confirmButtonText: 'Ok',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          this.router.navigateByUrl('/purchases/operators');
        }
      });
    }, error => {
      $('.preloader').fadeOut();
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
    });
  }


}
