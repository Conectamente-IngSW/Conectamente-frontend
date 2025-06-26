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
        path: '',
        //redirectTo: 'auth/login',
        //redirectTo: 'paciente/mi_cuenta/configuracion',
        redirectTo: 'paciente/mi_cuenta/visualizar-cita',
        pathMatch: 'full'
    }
];
