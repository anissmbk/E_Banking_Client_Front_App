import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../client_service/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private id: any;
  // @ts-ignore
  private client = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    creation_date: '',
  };
  options = {
    componentRestrictions: {country: 'ma'}
  };
  private accounts: any;
  private images: any;
  private account = {
    typecontrat: '',
    balance: '',
    id_client: 0,
    id_manager_client: 0,
  };

  constructor(private route: ActivatedRoute, private clientService: ClientService) {

  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.id = JSON.parse(localStorage.getItem('user')).id;
    this.account.id_client = this.id;
    this.clientService.getClient(this.id).then(resp => {
      console.log(resp);
      // @ts-ignore
      this.client.firstname = resp.firstname;
      // @ts-ignore
      this.client.lastname = resp.lastname;
      // @ts-ignore
      this.client.email = resp.email;
      // @ts-ignore
      this.client.address = resp.adress;
      // @ts-ignore
      this.client.phone = resp.numtel;
      // @ts-ignore
      this.client.creation_date = resp.createdDate[2] + '/' + resp.createdDate[1] + '/' + resp.createdDate[0];
      // @ts-ignore
      this.accounts = resp.account;
      // @ts-ignore
      this.images = resp.image;
      let user = JSON.parse(localStorage.getItem('user'));
      this.account.id_manager_client = user.id;
    }).catch(err => {
      console.log(err);
    });
  }

  toDate(date) {
    let dateNew = new Date(parseInt(date));
    return dateNew.getDate() + '/' + (dateNew.getMonth() + 1) + '/' + dateNew.getFullYear();
  }
}
