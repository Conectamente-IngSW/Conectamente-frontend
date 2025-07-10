import { Component, OnInit } from '@angular/core'; 
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PsicologoService, VisualizarPsicologoDTO } from '../../../../core/services/psicologo.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { PacienteService } from '../../../../core/services/paciente.service';
import { CitaService, CrearCitaDTO } from '../../../../core/services/cita.service';

// Angular Material
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})


export class PerfilComponent implements OnInit {
  psicologo!: VisualizarPsicologoDTO;

  selected: Date = new Date(); // Fecha seleccionada del mat-calendar
  selectedTime: string | null = null;

  cita: CrearCitaDTO = {
    fechaCita: '',     // Se seteará con this.selected
    horaCita: '',      // Se seteará con onTimeClick
    descripcion: 'Sesión de evaluación inicial',
    idPaciente: 0,
    idPsicologo: 0
  };

  constructor(
    private route: ActivatedRoute,
    private psicologoService: PsicologoService,
    private authService: AuthService,
    private pacienteService: PacienteService,
    private citaService: CitaService
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

    // Obtener paciente por ID de usuario logueado
    const authData = this.authService.getAuthData();
    console.log('🧾 AuthData:', authData);
    if (authData?.idUsuario) {
      
      this.pacienteService.getPacientePorUsuarioId(authData.idUsuario).subscribe({
        next: paciente => {
          console.log('✅ Paciente cargado:', paciente);
          this.cita.idPaciente = paciente.id;
        },
        error: err => {
          console.error('Error al obtener paciente:', err);
        }
      });
    } else {
      console.warn('No se pudo obtener el ID del usuario logueado.');
    }
  }

  onTimeClick(hora: string) {
    this.selectedTime = hora;
    //this.cita.horaCita = hora;
    this.cita.horaCita = hora.length === 5 ? `${hora}:00` : hora;
    // Asegurarse de que la fecha esté actualizada también
    this.cita.fechaCita = this.selected.toISOString().split('T')[0];
  }

  get resumenSeleccion(): string {
    const fecha = this.selected;
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

  get datosCargados(): boolean {
  return this.cita.idPaciente > 0 && this.cita.idPsicologo > 0;
}


agendarCita() {
  if (!this.cita.idPaciente || this.cita.idPaciente === 0) {
    alert('⚠️ El ID del paciente aún no se ha cargado. Por favor, espera un momento e intenta nuevamente.');
    return;
  }

  if (!this.cita.fechaCita || !this.cita.horaCita) {
    alert('❗ Debes seleccionar una fecha y una hora.');
    return;
  }

  console.log('📤 Payload que se envía:', JSON.stringify(this.cita, null, 2));

  this.citaService.crearCita(this.cita).subscribe({
    next: () => alert('✅ Cita agendada con éxito'),
    error: err => console.error('❌ Error al agendar cita:', err)
  });
}


}
