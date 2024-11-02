import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/lista-compras'
      }
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin // Redireciona para a origem após o logout
      },
    });
  }
}
