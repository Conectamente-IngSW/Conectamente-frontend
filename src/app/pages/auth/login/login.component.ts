import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../shared/model/auth-request.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  controlHasError(control: string, error: string): boolean {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.showSnackBar('Inicio de sesión exitoso');
        this.navigateBasedOnRole(response.rol);
      },
      error: () => {
        this.showSnackBar('Error al iniciar sesión. Verifica tus datos.');
      }
    });
  }

  loginWithGoogle(): void {
    this.authService.googleLoginAndRegisterIfNeeded().subscribe({
      next: (response) => {
        this.showSnackBar('Sesión iniciada con Google');
        this.navigateBasedOnRole(response.rol);
      },
      error: (error) => {
        console.error('Error con Google login', error);
        this.showSnackBar('Error al iniciar sesión con Google');
      }
    });
  }

  private navigateBasedOnRole(role: string): void {
    switch (role) {
      case 'PACIENTE':
        this.router.navigate(['/paciente/pantalla_principal/visualizar-psicologo']);
        break;
      case 'PSICOLOGO':
        this.router.navigate(['/psicologo/mi_cuenta/configuracion']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/paciente/pantalla_principal/visualizar-psicologo']);
        break;
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}


