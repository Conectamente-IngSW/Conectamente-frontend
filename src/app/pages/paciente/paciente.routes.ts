import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './mi_cuenta/configuracion/configuracion.component';
import { VisualizarCitaComponent } from './mi_cuenta/visualizar-cita/visualizar-cita.component';

export const pacienteRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'mi_cuenta/configuracion', component: ConfiguracionComponent },
      { path: 'mi_cuenta/visualizar-cita', component: VisualizarCitaComponent }
    ]
  }
];
