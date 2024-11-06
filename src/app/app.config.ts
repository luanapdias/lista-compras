import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-op33th625n48wflg.us.auth0.com',
      clientId: 'rZyT8fIzomvqWNoidG9v9Ew2M4fYXkts',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-op33th625n48wflg.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage'
    }),
  ]
};
