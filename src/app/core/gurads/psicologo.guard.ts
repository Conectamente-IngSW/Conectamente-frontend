import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';  // adjust path if needed

@Injectable({ providedIn: 'root' })
export class PsicologoGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isPsicologo()) {
      return true;
    }
    this.router.navigate(['/psicologo']);
    return false;
  }
}