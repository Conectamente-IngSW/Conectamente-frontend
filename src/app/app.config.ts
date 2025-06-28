import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';

// ✅ Solución temporal: desactiva imports rotos si no existen en tu Angular actual
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ❌ Estos dos solo si existen en tu versión:
    // provideForms(),
    // provideNgModel(),
    provideRouter(routes),
  ]
};

