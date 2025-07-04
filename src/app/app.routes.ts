//Aquí se manejan todas las rutas del proyecto
import { Routes } from '@angular/router';

export const routes: Routes = [
    //Carga del auth.routes, desde donde se manejan las rutas del login y registro
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes)

    },
    {
        path: 'paciente',
        loadChildren: () => import('./pages/paciente/paciente.routes').then(m => m.pacienteRoutes)
    },
    {
        path: 'landing',
        loadChildren: () => import('./pages/landing/landing.routes').then(m => m.landingRoutes)
    },
    {
        path: '',
        //redirectTo: 'auth/login',
        //redirectTo: 'paciente/mi_cuenta/configuracion',
        //redirectTo: 'paciente/mi_cuenta/visualizar-cita',
        redirectTo: 'paciente/pantalla_principal/visualizar-psicologo',
        //redirectTo: 'paciente/perfil_psicologo/perfil',
        pathMatch: 'full'
    }
];
