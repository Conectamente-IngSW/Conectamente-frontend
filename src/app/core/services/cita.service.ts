// cita.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CrearCitaDTO {
  fechaCita: string;
  horaCita: string;
  descripcion: string;
  idPaciente: number;
  idPsicologo: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private baseUrl = 'http://localhost:8080/api/v1/cita';

  constructor(private http: HttpClient) {}

  crearCita(cita: CrearCitaDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, cita);
  }
}
