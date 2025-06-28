import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // o la ruta donde tengas tus rutas definidas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
