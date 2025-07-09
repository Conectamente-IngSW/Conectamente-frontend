import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterPsicologoRequest } from '../../../shared/model/register-psicologo-request.model';
import { RegisterPsicologoResponse } from '../../../shared/model/register-psicologo-response.model';

@Component({
  selector: 'app-register-psicologo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatCardModule, RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register-psicologo.component.html',
  styleUrls: ['./register-psicologo.component.css']
})
export class RegisterPsicologoComponent {
  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      especialidad: ['', Validators.required],
      numColegiatura: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(frm: FormGroup) {
    const password = frm.get('password')?.value;
    const confirmPassword = frm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  controlHasError(c: string, err: string) {
    return this.registerForm.controls[c].hasError(err);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Corrige los errores antes de continuar.', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }

    const req: RegisterPsicologoRequest = {
      nombre: this.registerForm.value.nombres,
      apellido: this.registerForm.value.apellidos,
      email: this.registerForm.value.email,
      dni: this.registerForm.value.dni,

      edad: parseInt(this.registerForm.value.edad),

      especialidad: this.registerForm.value.especialidad,
      numColegiatura: this.registerForm.value.numColegiatura,
      password: this.registerForm.value.password
    };

    this.authService.registerPsicologo(req)
      .subscribe({
        next: (res: RegisterPsicologoResponse) => {
          this.snackBar.open('Psicologo registrado!', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/registro/psicologo']);
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
