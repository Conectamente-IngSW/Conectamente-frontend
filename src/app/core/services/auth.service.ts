import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, of, switchMap, tap } from 'rxjs';
import { AuthRequest } from '../../shared/model/auth-request.model';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { RegisterPacienteRequest } from '../../shared/model/register-paciente-request.model';
import { RegisterPacienteResponse } from '../../shared/model/register-paciente-response.model';
import { RegisterPsicologoRequest } from '../../shared/model/register-psicologo-request.model';
import { RegisterPsicologoResponse } from '../../shared/model/register-psicologo-response.model';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

// Angular Fire imports
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private auth = inject(Auth);

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
    this.auth.signOut();
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

  /**
   * Inicia sesión con Google y registra automáticamente como paciente si no existe
   */
  googleLoginAndRegisterIfNeeded(): Observable<AuthResponse> {
    const provider = new GoogleAuthProvider();
    return new Observable<AuthResponse>((observer) => {
      signInWithPopup(this.auth, provider)
        .then((result: UserCredential) => {
          const email = result.user.email || '';
          const name = result.user.displayName || '';
          const [nombre, apellido = ''] = name.split(' ');

          const registerData: RegisterPacienteRequest = {
            nombre,
            apellido,
            email,
            password: result.user.uid,
            dni: '',
          };

          this.registerPaciente(registerData).pipe(
            switchMap(() => this.login({ email: email, password: result.user.uid }))
          ).subscribe({
            next: (res) => {
              this.storageService.setAuthData(res);
              observer.next(res);
              observer.complete();
            },
            error: (err) => {
              if (err.status === 400 || err.status === 409) {
                // Ya registrado, solo login
                this.login({ email: email, password: result.user.uid }).subscribe({
                  next: (res) => {
                    this.storageService.setAuthData(res);
                    observer.next(res);
                    observer.complete();
                  },
                  error: (loginErr: any) => observer.error(loginErr)
                });
              } else {
                observer.error(err);
              }
            }
          });
        })
        .catch((error: any) => observer.error(error));
    });
  }
}
