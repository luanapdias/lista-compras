import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';  // Aqui estamos assumindo que você está usando o Auth0 para autenticação

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrls: ['./token-expired.component.css']
})
export class TokenExpiredComponent {

  constructor(private authService: AuthService) {}

  // Método para redirecionar para a tela de login
  redirectToLogin(): void {
    this.authService.loginWithRedirect();  // Esse método irá redirecionar o usuário para a tela de login
  }
}
