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

  ngOnInit() {
    // Redireciona para a lista de compras se o usuário estiver autenticado
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('Is Authenticated: ', isAuthenticated);
        this.router.navigate(['/lista-compras']); // Navegar para a lista de compras
      }
    });

    // Lida com redirecionamento após login
    this.auth.appState$.subscribe((appState) => {
      if (appState && appState.target) {
        console.log('AppState: ', appState);
        this.router.navigate([appState.target]);
      }
    });
  }

  login(): void {
    console.log('Login: ', this.router.url);
    this.auth.loginWithRedirect({
      appState: {
        target: '/lista-compras'
        // target: '/login'
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
