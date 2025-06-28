import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { SelectRegisterComponent } from './select-register/select-register.component';
import { RegisterPacienteComponent } from './register-paciente/register-paciente.component';
import { RegisterPsicologoComponent } from './register-psicologo/register-psicologo.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SelectRegisterComponent },         // ✅ ESTA LÍNEA
      { path: 'register/paciente', component: RegisterPacienteComponent },
      { path: 'register/psicologo', component: RegisterPsicologoComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
]

  }
];
