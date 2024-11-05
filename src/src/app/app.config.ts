import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig = {
//   providers: [
//     provideHttpClient(),
//   ],
// };

// bootstrapApplication(AppComponent, appConfig);
