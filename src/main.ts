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
import { IconService } from './app/services/icon.service';

const iconService = new IconService();
const icons = iconService.getIcons();

const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LucideAngularModule, useValue: LucideAngularModule.pick(icons) }
  ]
};

bootstrapApplication(AppComponent, extendedAppConfig)
  .catch((err) => console.error(err));
