// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { LucideAngularModule } from 'lucide-angular';
import { IconService } from './app/shared/services/icon.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from '@services/login/error-interceptor.service';
import { JwtInterceptorService } from '@services/login/jwt-interceptor.service';

const iconService = new IconService();
const icons = iconService.getIcons();

const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LucideAngularModule, useValue: LucideAngularModule.pick(icons) },
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

bootstrapApplication(AppComponent, extendedAppConfig, )
  .catch((err) => console.error(err));
