import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './mi_cuenta/configuracion/configuracion.component';

export const psicologoRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'mi_cuenta/configuracion', component: ConfiguracionComponent },
      { path: '', redirectTo: 'mi_cuenta/configuracion', pathMatch: 'full' }
    ]
  }
]; 