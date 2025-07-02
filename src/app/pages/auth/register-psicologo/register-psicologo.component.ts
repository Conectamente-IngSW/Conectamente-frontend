import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register-psicologo',
  standalone: true,
  templateUrl: './register-psicologo.component.html',
  styleUrls: ['./register-psicologo.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterPsicologoComponent {
  nombres = '';
  apellidos = '';
  email = '';
  telefono = '';
  numColegiatura = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const psicologo = {
      nombre: this.nombres,
      apellido: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      numColegiatura: this.numColegiatura,
      password: this.password,
    };

    this.authService.registerPsicologo(psicologo).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Error al registrar psicólogo', err)
    });
  }
}
