import { Routes } from '@angular/router';
import { SelectRegisterComponent } from './pages/auth/select-register/select-register.component';
import { RegisterPacienteComponent } from './pages/auth/register-paciente/register-paciente.component';
import { RegisterPsicologoComponent } from './pages/auth/register-psicologo/register-psicologo.component';

export const routes: Routes = [
  // AUTH MODULE
  {
    path: 'auth',
    children: [
      { path: '',     redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      { path: 'register',           component: SelectRegisterComponent },
      { path: 'register/paciente',  component: RegisterPacienteComponent },
      { path: 'register/psicologo', component: RegisterPsicologoComponent },
    ]
  },

  // REGISTRO MODULE (for direct navigation from select-register)
  {
    path: 'registro',
    children: [
      { path: 'paciente',  component: RegisterPacienteComponent },
      { path: 'psicologo', component: RegisterPsicologoComponent },
    ]
  },

  // PACIENTE MODULE
  {
    path: 'paciente',
    loadChildren: () =>
      import('./pages/paciente/paciente.routes').then(m => m.pacienteRoutes)
  },

  // PSICOLOGO MODULE
  {
    path: 'psicologo',
    loadChildren: () => import('./psicologo/psicologo.routes').then(m => m.psicologoRoutes)
  },

  // LANDING MODULE
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.routes').then(m => m.landingRoutes)
  },

  // Default redirect when someone hits '/'
  { path: '',  redirectTo: 'auth', pathMatch: 'full' },

  // Wildcard route for 404 / unknown paths
  { path: '**', redirectTo: 'auth' }
];
