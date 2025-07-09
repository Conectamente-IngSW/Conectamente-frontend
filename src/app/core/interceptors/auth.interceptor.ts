// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './../services/storage.service';

export interface AuthResponse {
  token: string;
  nombre: string;
  apellido: string;
  rol: string;
}

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authData = storageService.getAuthData();
  const token = authData?.token;
  //const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBjb25lY3RhbWVudGUuY29tIiwicm9sZSI6IlJPTEVfQURNSU5JU1RSQURPUiIsImV4cCI6MTc1MzU4Nzc4Nn0.E5jFNKRx6M_M33n6lmUFBvl9CVTRgvDNPdtV6ytKuTbuAdbEVSTYqCGCPqATCLaGdwfLHu7NAYywjZnTwL5wCQ';

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Interceptor aplicado con token');
    return next(cloned);
  }

  return next(req);

  
};