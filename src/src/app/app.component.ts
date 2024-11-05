import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaComprasComponent, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lista-compras';

  constructor(private router: Router) {}
  // constructor(public auth: AuthService, private router: Router) {}

  // ngOnInit() {
  //   // Redireciona para a lista de compras se o usuário estiver autenticado
  //   this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       console.log('Is Authenticated: ', isAuthenticated);
  //       this.router.navigate(['/lista-compras']); // Navegar para a lista de compras
  //     }
  //   });

  //   // Lida com redirecionamento após login
  //   this.auth.appState$.subscribe((appState) => {
  //     if (appState && appState.target) {
  //       console.log('AppState: ', appState);
  //       this.router.navigate([appState.target]);
  //     }
  //   });
  // }
}
