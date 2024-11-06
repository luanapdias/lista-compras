import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isAuthenticated$: Observable<boolean>; // Observable para verificar a autenticação

  constructor(private auth: AuthService, private router: Router) {
    this.isAuthenticated$ = this.auth.isAuthenticated$; // Atribui o observable
  }

  ngOnInit() {
    // Verifica se o usuário está autenticado e redireciona
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/lista-compras']); // Redireciona para a página lista-compras após login
      }
    });
  }

  login(): void {
    // Executa o login com redirecionamento
    this.auth.loginWithRedirect({
      appState: {
        target: '/lista-compras' // Redireciona para a página lista-compras após login
      }
    });
  }

  logout(): void {
    // Executa o logout e redireciona para a página inicial
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
}
