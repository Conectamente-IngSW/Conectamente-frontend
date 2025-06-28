import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Crear el formulario aquí
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      descripcion: [''],
    });
  }

  updatePaciente() {
    const idPaciente = 1; // temporal
    const data = this.pacienteForm.value;
    data.idUsuario = 2; // temporal

    console.log('Enviando datos actualizados:', data);
  }
}
