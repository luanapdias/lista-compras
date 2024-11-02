import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Rota padrão para o login
  { path: 'lista-compras', component: ListaComprasComponent, canActivate: [AuthGuard] }, // Rota para a lista de compras
  { path: '**', redirectTo: '' } // Redireciona para login se a rota não existir
];
