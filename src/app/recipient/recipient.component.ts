import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {

  recipientForm: FormGroup;
  submitted = false;
  recipient: any;
  private client = {
    firstName: '',
    lastName: ''
  };
  clientId: number;
  height: number = $(window).height() - 64 - 220;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'rib'];
  dataSource: any;
  ELEMENT_DATA: any = [];
  searchKey: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.clientId = JSON.parse(localStorage.getItem('user')).id;
    this.recipientForm = this.formBuilder.group({
      fullName: ['', Validators.compose([Validators.maxLength(70),
        Validators.required])],
      rib: ['', Validators.compose([Validators.maxLength(70),
        Validators.required])],
    }, {});
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.clientService.getClient(this.clientId).then(resp => {
      // @ts-ignore
      this.ELEMENT_DATA = resp.beneficiaries;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // @ts-ignore
      this.client.firstName = resp.firstname;
      // @ts-ignore
      this.client.lastName = resp.lastname;

    }).catch(err => {
      console.log(err);
    });
  }


  get f() {
    return this.recipientForm.controls;
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

  addRecipient() {
    this.submitted = true;
    if (this.recipientForm.invalid) {
      console.log('invalid');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Champs Invalid!!!',
      });
      return;
    }
    $('.preloader').fadeIn();
    this.recipient = this.recipientForm.value;
    this.recipient.clientId = this.clientId;
    console.log(this.recipient);
    this.clientService.createRecipient(this.recipient).then(resp => {
      $('.preloader').fadeOut();
      location.reload();
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
