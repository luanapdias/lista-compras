import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaComprasComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lista-compras';

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Redireciona para a lista de compras se o usuário estiver autenticado
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/lista-compras']); // Navegar para a lista de compras
      }
    });

    // Lida com redirecionamento após login
    this.auth.appState$.subscribe((appState) => {
      if (appState && appState.target) {
        this.router.navigate([appState.target]);
      }
    });
  }
}
