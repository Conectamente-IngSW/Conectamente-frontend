//Aquí se manejan todas las rutas del proyecto
import { Routes } from '@angular/router';

export const routes: Routes = [
    //Carga del auth.routes, desde donde se manejan las rutas del login y registro
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
