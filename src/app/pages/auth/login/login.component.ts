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
      next: () => {
        this.showSnackBar('Inicio de sesión exitoso');
        this.router.navigate(['/login']); // Ajusta esta ruta si es diferente
      },
      error: () => {
        this.showSnackBar('Error al iniciar sesión. Verifica tus datos.');
      }
    });
  }

  loginWithGoogle(): void {
  this.authService.googleLoginAndRegisterIfNeeded().subscribe({
    next: () => {
      this.showSnackBar('Sesión iniciada con Google');
      this.router.navigate(['/visualizar-psicologo']);
    },
    error: (error) => {
      console.error('Error con Google login', error);
      this.showSnackBar('Error al iniciar sesión con Google');
    }
  });
}

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}


