import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { AuthRequest } from '../../shared/model/auth-request.model';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { RegisterPacienteRequest } from '../../shared/model/register-paciente-request.model';
import { RegisterPacienteResponse } from '../../shared/model/register-paciente-response.model';
import { RegisterPsicologoRequest } from '../../shared/model/register-psicologo-request.model';
import { RegisterPsicologoResponse } from '../../shared/model/register-psicologo-response.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    );
  }

  registerPaciente(data: RegisterPacienteRequest): Observable<RegisterPacienteResponse> {
    return this.http.post<RegisterPacienteResponse>(`${this.baseURL}/registro/paciente`, data);
  }

  registerPsicologo(data: RegisterPsicologoRequest): Observable<RegisterPsicologoResponse> {
    return this.http.post<RegisterPsicologoResponse>(`${this.baseURL}/registro/psicologo`, data);
  }

  logout(): void {
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  getUser(): AuthResponse | null {
    return this.storageService.getAuthData();
  }

  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.rol : null;
  }
}
