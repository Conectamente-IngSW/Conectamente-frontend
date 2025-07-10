// paciente.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VisualizarPacienteDTO {
  id: number;
  nombre: string;
  apellido: string;
  // agrega los demás campos que necesitas
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private baseUrl = 'http://localhost:8080/api/v1/paciente';

  constructor(private http: HttpClient) {}

  getPacientePorUsuarioId(idUsuario: number): Observable<VisualizarPacienteDTO> {
    return this.http.get<VisualizarPacienteDTO>(`${this.baseUrl}/usuario/${idUsuario}`);
  }
}
