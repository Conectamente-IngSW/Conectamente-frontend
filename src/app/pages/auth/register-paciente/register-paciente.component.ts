import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterPacienteRequest } from '../../../shared/model/register-paciente-request.model';
import { RegisterPacienteResponse } from '../../../shared/model/register-paciente-response.model';

@Component({
  selector: 'app-register-paciente',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatCardModule, MatSnackBarModule, MatButtonModule,
    RouterLink
  ],
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.css']
})
export class RegisterPacienteComponent {
  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(frm: FormGroup) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value 
      ? null : { notMatching: true };
  }

  controlHasError(c: string, err: string) {
    return this.registerForm.controls[c].hasError(err);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Corrige los errores antes de continuar.', 'Cerrar',{ duration: 2000 });
      return;
    }

    const req: RegisterPacienteRequest = {
      nombre: this.registerForm.value.nombres,
      apellido: this.registerForm.value.apellidos,
      email: this.registerForm.value.email,
      dni: this.registerForm.value.dni,
      password: this.registerForm.value.password,
    };

    this.authService.registerPaciente(req)
      .subscribe({
        next: (res: RegisterPacienteResponse) => {
          this.snackBar.open('Paciente registrado!', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/registro/paciente']);
        },
        error: (err: any) => {
          this.snackBar.open(err.error?.message || 'Error al registrar.', 'Cerrar', { duration: 3000 });
        }
      });
  }
  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
