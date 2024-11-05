import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { provideAuth0 } from '@auth0/auth0-angular';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(), 
//     provideAuth0({
//       domain: 'dev-op33th625n48wflg.us.auth0.com',
//       clientId: 'rZyT8fIzomvqWNoidG9v9Ew2M4fYXkts',
//     }),
//   ],
// })
// .catch((err) => console.error(err));