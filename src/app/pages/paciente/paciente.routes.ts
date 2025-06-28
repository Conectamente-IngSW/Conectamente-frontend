import { Routes } from '@angular/router';
import { ConfiguracionComponent } from './mi_cuenta/configuracion/configuracion.component';
import { VisualizarCitaComponent } from './mi_cuenta/visualizar-cita/visualizar-cita.component';
import { VisualizarPsicologoComponent } from './pantalla_principal/visualizar-psicologo/visualizar-psicologo.component';
import { PerfilComponent } from './perfil_psicologo/perfil/perfil.component';

export const pacienteRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'mi_cuenta/configuracion', component: ConfiguracionComponent },
      { path: 'mi_cuenta/visualizar-cita', component: VisualizarCitaComponent },
      {path: 'pantalla_principal/visualizar-psicologo', component: VisualizarPsicologoComponent},
      {path: 'perfil_psicologo/perfil', component: PerfilComponent}    
    ]
  }
];
