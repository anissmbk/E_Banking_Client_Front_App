import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ebankingfront';
  // private isConnected: boolean;
  private isConnected = true;
  height: number = $(window).height() - 64;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authenticationState.subscribe(state => {
      this.isConnected = state;
      let url = window.location.href;
      console.log('user connected ? ', state);
      console.log('current_page', window.location.href);
      if (state) {
        if ((url.indexOf('login') > 0 || url.indexOf('forgot_password') > 0)) {
          this.router.navigateByUrl('/home');
        }
      } else {
        // tslint:disable-next-line:triple-equals
        if (url.indexOf('login') == -1 && url.indexOf('forgot_password') == -1) {
          // this.router.navigateByUrl('/login');
        }
      }
    });
  }

  logout() {
    localStorage.setItem('user', null);
    localStorage.setItem('token', null);
    this.authService.authenticationState.next(false);
    this.router.navigateByUrl("/login");
  }

}
