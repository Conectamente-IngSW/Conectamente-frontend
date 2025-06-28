import { Routes } from '@angular/router';
import { SelectRegisterComponent } from './pages/auth/select-register/select-register.component';
import { RegisterPacienteComponent } from './pages/auth/register-paciente/register-paciente.component';
import { RegisterPsicologoComponent } from './pages/auth/register-psicologo/register-psicologo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: SelectRegisterComponent },
  { path: 'register/paciente', component: RegisterPacienteComponent },
  { path: 'register/psicologo', component: RegisterPsicologoComponent },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) }
];
