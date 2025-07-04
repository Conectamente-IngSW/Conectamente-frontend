import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

// Angular Material
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-visualizar-psicologo',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule
  ],
  templateUrl: './visualizar-psicologo.component.html',
  styleUrl: './visualizar-psicologo.component.css'
})
export class VisualizarPsicologoComponent {
  psicologos: any[] = [];

  filtroEspecialidad: string | null = null;


  especialidades = [
  { label: 'Clínica', value: 'CLINICA' },
  { label: 'Educativa', value: 'EDUCATIVA' },
  { label: 'Organizacional', value: 'ORGANIZACIONAL' },
  { label: 'Deportiva', value: 'DEPORTIVA' }
];


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Al iniciar sesión (o al cargar el componente), obtener todos los psicólogos
    this.http.get<any[]>('http://localhost:8080/api/v1/psicologo')
      .subscribe(data => {
        console.log('Psicólogos cargados:', data);
        this.psicologos = data;
      });
  }

}
