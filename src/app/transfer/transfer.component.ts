import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  isSubmitted = false;
  private id;
  accounts: any ;
  recipients: any ;
  private transaction = {
    account: '',
    recipient: '',
    amount: ''
  };
  constructor(public fb: FormBuilder, private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  registrationForm = this.fb.group({
    recipientName: ['', [Validators.required]],
    accountName: ['', [Validators.required]],
    amount: ['', [Validators.required]]
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

  transferMoney() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
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
      console.log('apres filtrage de resultat');
      console.log(this.transaction);
      // TODO
      // zeeed wa7ed are u sure
      this.clientService.createTransaction(this.transaction).then(resp => {
        console.log(resp);
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
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'error serveur :' + err,
        });
      });
    }
  }
}
