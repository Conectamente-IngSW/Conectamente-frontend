import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


// ✅ Solución temporal: desactiva imports rotos si no existen en tu Angular actual
export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(),
    // ❌ Estos dos solo si existen en tu versión:
    // provideForms(),
    // provideNgModel(),
    provideRouter(routes),
    HttpClientModule,
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
};

