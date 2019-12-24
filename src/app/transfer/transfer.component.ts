import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';
import {PhoneVerificationStart} from "../purchases/models/phoneVerificationStart";
import {PurchaseService} from "../purchases/services/purchase.service";
import {Transaction} from "../purchases/models/transaction";
import {TransactionVerification} from "../purchases/models/transactionVerification";

declare var $: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  private phoneVerificationStart: PhoneVerificationStart = {};

  isSubmitted = false;
  private id;
  accounts: any;
  recipients: any;
  private transaction: Transaction={};
  private transactionVerification: TransactionVerification = {};
  private code: string;

  constructor(private purchaseService: PurchaseService, public fb: FormBuilder, private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  registrationForm = this.fb.group({
    recipientName: ['', [Validators.required]],
    accountName: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    code: [''],
  });

  ngOnInit() {
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

  changeAccount(e) {
    console.log(e.target.value);
    this.accountName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeRecipient(e) {
    console.log(e.target.value);
    this.recipientName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get accountName() {
    return this.registrationForm.get('accountName');
  }

  get recipientName() {
    return this.registrationForm.get('recipientName');
  }


  showModal() {
    if (this.registrationForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid!!!',
      });
      return;
    }
    ;
    $('#verifyModal').modal("show");
    this.verify();
  }

  verify() {

    this.phoneVerificationStart.countryCode = "212";
    this.phoneVerificationStart.via = "sms";
    this.phoneVerificationStart.phoneNumber = JSON.parse(localStorage.getItem('user')).numtel;
    this.purchaseService.verifyPurchase(this.phoneVerificationStart).subscribe(result => {

    })

  }


  transferMoney() {
    $('.preloader').fadeIn();
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      $('.preloader').fadeOut();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Remplir tout les champs',
      });
      return false;
    } else {
      // alert(JSON.stringify(this.registrationForm.value));
      console.log(this.registrationForm.value);
      this.transaction.account = this.registrationForm.value.accountName.substring(3);
      this.transaction.recipient = this.registrationForm.value.recipientName.substring(3);
      this.transaction.amount = this.registrationForm.value.amount;
      this.transactionVerification.transaction = this.transaction;
      this.transactionVerification.countryCode = "212";
      this.transactionVerification.phoneNumber = JSON.parse(localStorage.getItem('user')).numtel;
      this.transactionVerification.token = this.code;

      console.log('apres filtrage de resultat');
      console.log(this.transaction);
      // TODO
      // zeeed wa7ed are u sure
      this.clientService.createTransaction(this.transactionVerification).then(resp => {
        console.log(resp);
        $('.preloader').fadeOut();
        $('#verifyModal').modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'success Transaction',
          text: 'success Transaction :^D',
          confirmButtonText: 'Ok',
          showLoaderOnConfirm: true,
          preConfirm: (email) => {
            location.reload();
          }
        });
      }).catch(err => {
        $('.preloader').fadeOut();
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '' + err.error,
        });
      });
    }
  }

}
