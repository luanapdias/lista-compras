import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenExpiredComponent } from './token-expired/token-expired.component';  // Componente para token expirado
import { loginGuard } from './guards/login.guard';  // Importa o guard

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },  // Redireciona para o login
  { path: 'login', component: LoginComponent },  // Componente de login
  { path: 'lista-compras', component: ListaComprasComponent, canActivate: [loginGuard] },  // Protege a lista-compras com loginGuard
  { path: 'token-expired', component: TokenExpiredComponent },  // Nova rota para token expirado
  { path: '**', component: PageNotFoundComponent },  // Página 404
];
