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

  //elementos para el menú desplegable de filtros
  filtroEspecialidad: string | null = null;
  filtroDepartamento: string | null = null;
  filtroPrecio: string | null = null; 
  filtroNombre: string | null = null;

  especialidades = [
  { label: 'Clínica', value: 'CLINICA' },
  { label: 'Educativa', value: 'EDUCATIVA' },
  { label: 'Organizacional', value: 'ORGANIZACIONAL' },
  { label: 'Forense', value: 'FORENSE' },
  { label: 'Deportiva', value: 'DEPORTIVA' },
  { label: 'Neuropsicología', value: 'NEUROPSICOLOGIA' },
  { label: 'Social', value: 'SOCIAL' },
  { label: 'Familiar', value: 'FAMILIAR' },
  { label: 'Terapia de pareja', value: 'TERAPIA_PAREJA' },
  { label: 'Adicciones', value: 'ADICCIONES' }
  ];

  departamentos = [
  { label: 'Amazonas', value: 'AMAZONAS' },
  { label: 'Áncash', value: 'ANCASH' },
  { label: 'Apurímac', value: 'APURIMAC' },
  { label: 'Arequipa', value: 'AREQUIPA' },
  { label: 'Ayacucho', value: 'AYACUCHO' },
  { label: 'Cajamarca', value: 'CAJAMARCA' },
  { label: 'Callao', value: 'CALLAO' },
  { label: 'Cusco', value: 'CUSCO' },
  { label: 'Huancavelica', value: 'HUANCAVELICA' },
  { label: 'Huánuco', value: 'HUANUCO' },
  { label: 'Ica', value: 'ICA' },
  { label: 'Junín', value: 'JUNIN' },
  { label: 'La Libertad', value: 'LA_LIBERTAD' },
  { label: 'Lambayeque', value: 'LAMBAYEQUE' },
  { label: 'Lima', value: 'LIMA' },
  { label: 'Loreto', value: 'LORETO' },
  { label: 'Madre de Dios', value: 'MADRE_DE_DIOS' },
  { label: 'Moquegua', value: 'MOQUEGUA' },
  { label: 'Pasco', value: 'PASCO' },
  { label: 'Piura', value: 'PIURA' },
  { label: 'Puno', value: 'PUNO' },
  { label: 'San Martín', value: 'SAN_MARTIN' },
  { label: 'Tacna', value: 'TACNA' },
  { label: 'Tumbes', value: 'TUMBES' },
  { label: 'Ucayali', value: 'UCAYALI' }
];

rangosPrecio = [
  { label: 'Menos de S/ 50', value: 'MENOS_50' },
  { label: 'S/ 50 - S/ 100', value: '50_100' },
  { label: 'S/ 100 - S/ 200', value: '100_200' },
  { label: 'Más de S/ 200', value: 'MAS_200' }
];

//Cargar data de los psicólogos al iniciar el componente
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Al iniciar sesión (o al cargar el componente), obtener todos los psicólogos
    this.http.get<any[]>('http://localhost:8080/api/v1/psicologo')
      .subscribe(data => {
        console.log('Psicólogos cargados:', data);
        this.psicologos = data;
      });
  }


//construie la URL con los filtros seleccionados
private construirUrlConFiltros(): string {
  const params: string[] = [];

  if (this.filtroEspecialidad) {
    params.push(`especialidad=${this.filtroEspecialidad}`);
  }
  if (this.filtroDepartamento) {
    params.push(`departamento=${this.filtroDepartamento}`);
  }
  if (this.filtroPrecio) {
    // Mapear rangos de precio a minTarifa y maxTarifa
    switch (this.filtroPrecio) {
      case 'MENOS_50':
        params.push('minTarifa=0', 'maxTarifa=50');
        break;
      case '50_100':
        params.push('minTarifa=50.01', 'maxTarifa=100');
        break;
      case '100_200':
        params.push('minTarifa=100.01', 'maxTarifa=200');
        break;
      case 'MAS_200':
        params.push('minTarifa=200.01');
        break;
    }
  }
  if (this.filtroNombre && this.filtroNombre.trim() !== '') {
    params.push(`nombre=${encodeURIComponent(this.filtroNombre.trim())}`);
  }

  const queryString = params.length > 0 ? '?' + params.join('&') : '';
  return `http://localhost:8080/api/v1/psicologo/buscar${queryString}`;
}

// Método para filtrar psicólogos según los criterios seleccionados
filtrarPsicologos(): void {
  const url = this.construirUrlConFiltros();

  this.http.get<any[]>(url)
    .subscribe(data => {
      this.psicologos = data;
    });
}


}
