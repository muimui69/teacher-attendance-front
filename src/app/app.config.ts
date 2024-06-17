import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptorService } from '@services/login/jwt-interceptor.service';
import { ErrorInterceptorService } from '@services/login/error-interceptor.service';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true
      })
    ),
    provideHttpClient(),
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ]
};
