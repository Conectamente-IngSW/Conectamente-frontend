import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PsicologoService, VisualizarPsicologoDTO } from '../../../../core/services/psicologo.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { PacienteService, VisualizarPacienteDTO } from '../../../../core/services/paciente.service';


// Angular Material
import {ChangeDetectionStrategy, model} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, 
    CommonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatIconModule, 
    MatIconModule,
    MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})


export class PerfilComponent implements OnInit {

  cita = {
  fechaCita: null as Date | null,
  horaCita: null as string | null,
  descripcion: 'Sesión de evaluación inicial',
  idPaciente: null as number | null,
  idPsicologo: null as number | null
};


  //calendario
  selected = model<Date | null>(null);
  selectedTime: string | null = null;

  psicologo!: VisualizarPsicologoDTO;

  constructor(
  private route: ActivatedRoute,
  private psicologoService: PsicologoService,
  private authService: AuthService,
  private pacienteService: PacienteService
) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  // Obtener psicólogo por ID de ruta
  if (id) {
    this.psicologoService.getPsicologoPorId(+id).subscribe({
      next: psicologo => {
        this.psicologo = psicologo;
        this.cita.idPsicologo = psicologo.id;
      },
      error: err => console.error('Error al obtener psicólogo:', err)
    });
  } else {
    console.warn('ID de psicólogo no proporcionado en la ruta.');
  }

  // Obtener paciente asociado al usuario logueado
  //const authData = this.authService.getAuthData();
  //if (authData?.id) {
  //  this.pacienteService.getPacientePorUsuarioId(authData.id).subscribe({
  //    next: paciente => {
  //      this.cita.idPaciente = paciente.id; // ✅ este sí es el ID correcto del paciente
  //    },
  //    error: err => {
  //      console.error('Error al obtener paciente:', err);
  //    }
  //  });
 // } else {
 //   console.warn('No se pudo obtener el ID del usuario logueado.');
 // }
}




get resumenSeleccion(): string {
  const fecha = this.selected();
  const hora = this.selectedTime;
  if (!fecha || !hora) return 'Selecciona una fecha y una hora';

  const fechaFormateada = new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(fecha);

  return `Has seleccionado el ${fechaFormateada} a las ${hora}`;
}

onTimeClick(hora: string) {
  this.selectedTime = hora;
}
}