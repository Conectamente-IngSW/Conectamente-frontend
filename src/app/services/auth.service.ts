import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { usernameOrEmail: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  registerPaciente(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/paciente`, data);
  }

  registerPsicologo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/psicologo`, data);
  }
}


