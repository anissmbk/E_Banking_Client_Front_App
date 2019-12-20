import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../client_service/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private client: any;
  private id;
  // private accounts: any;

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
     this.id = JSON.parse(localStorage.getItem('user')).id;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {

    this.clientService.getClient(this.id).then(resp => {
      console.log(resp);
      this.client = resp;
      // @ts-ignore
      // this.accounts = resp.account;
    }).catch(err => {
      console.log(err);
    });
  }

  navigateTo(id: number) {
    this.router.navigateByUrl('/account/' + id);
  }
}
