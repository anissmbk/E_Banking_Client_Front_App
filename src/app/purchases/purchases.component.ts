import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-purchases',
  template: `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3" style="font-size: 18px">
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item active mr-3">
                      <a class="nav-link" routerLink="/purchases/operators"> make recharge<span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" routerLink="/purchases/history">History of recharges</a>
                  </li>
              </ul>
          </div>
      </nav>
      <router-outlet></router-outlet>`,
})
export class PurchasesComponent implements OnInit {
  ngOnInit(): void {
  }
}
