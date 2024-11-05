import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // Redireciona para a tela de login caso a rota esteja vazia
  { path: 'login', component: LoginComponent }, // Rota para a tela de login
  { path: 'lista-compras', component: ListaComprasComponent, canActivate: [AuthGuard] }, // Rota para a lista de compras com proteção de AuthGuard
  { path: '**', component: PageNotFoundComponent }, // Redireciona para a tela de erro 404 caso a rota seja desconhecida
];
