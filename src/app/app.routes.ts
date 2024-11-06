import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // Redireciona para o login
  { path: 'login', component: LoginComponent }, // Componente de login
  { path: 'lista-compras', component: ListaComprasComponent, canActivate: [AuthGuard] }, // Protege a lista-compras
  { path: '**', component: PageNotFoundComponent }, // Página 404
];
