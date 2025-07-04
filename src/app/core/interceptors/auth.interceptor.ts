// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBjb25lY3RhbWVudGUuY29tIiwicm9sZSI6IlJPTEVfQURNSU5JU1RSQURPUiIsImV4cCI6MTc1MzU4Nzc4Nn0.E5jFNKRx6M_M33n6lmUFBvl9CVTRgvDNPdtV6ytKuTbuAdbEVSTYqCGCPqATCLaGdwfLHu7NAYywjZnTwL5wCQ';

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
