import { Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';   
import { PreciosComponent } from './precios/precios.component';
import { NosotrosComponent } from './nosotros/nosotros.component';



export const landingRoutes: Routes = [
  {
    path: '',
    children: [
      {path: 'principal', component: PrincipalComponent},
      {path: 'precios', component: PreciosComponent},
      {path: 'nosotros', component: NosotrosComponent}
    ]
  }
];

