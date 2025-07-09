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
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // OPTIONAL: a BehaviorSubject to drive reactive templates/guards
  private userSubject = new BehaviorSubject<AuthResponse| null>(this.storageService.getAuthData());
  user$ = this.userSubject.asObservable();

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(response => {
        this.storageService.setAuthData(response);
        this.userSubject.next(response);
      })
    );
  }

  logout(): void {
    this.storageService.clearAuthData();
    this.userSubject.next(null);
  }

  // raw getter
  getAuthData(): AuthResponse | null {
    return this.storageService.getAuthData();
  }

  // simple boolean checks
  isAuthenticated(): boolean {
    return !!this.getAuthData();
  }

  getUserRole(): string | null {
    return this.getAuthData()?.rol ?? null;
  }

  isPsicologo(): boolean {
    return this.getUserRole() === 'PSICOLOGO';
  }

  isPaciente(): boolean {
    return this.getUserRole() === 'PACIENTE';
  }

  registerPaciente(request: RegisterPacienteRequest): Observable<RegisterPacienteResponse> {
    return this.http.post<RegisterPacienteResponse>(`${this.baseURL}/register/paciente`, request);
  }

  registerPsicologo(request: RegisterPsicologoRequest): Observable<RegisterPsicologoResponse> {
    return this.http.post<RegisterPsicologoResponse>(`${this.baseURL}/register/psicologo`, request);
  }
}
