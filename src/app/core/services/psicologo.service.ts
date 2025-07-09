import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VisualizarPsicologoDTO {
  id: number;
  nombre: string;
  apellido: string;
  numColegiatura: string;
  disponibilidad: string;
  descripcion?: string; // opcional si puede venir null
  tarifa: number;
  especialidad: string; // o usa un enum si lo tienes
  modalidad: string;    // idem
  direccion: string;
  departamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {

  private baseUrl = 'http://localhost:8080/api/v1/psicologo'; // ajusta si es necesario

  constructor(private http: HttpClient) {}

  //Para obter el psicólogo por ID y armar el URL
  getPsicologoPorId(id: number): Observable<VisualizarPsicologoDTO> {
    return this.http.get<VisualizarPsicologoDTO>(`${this.baseUrl}/${id}`);
  }
}
