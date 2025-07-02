import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register-paciente',
  standalone: true,
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterPacienteComponent {
  nombres = '';
  apellidos = '';
  email = '';
  telefono = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const paciente = {
      nombre: this.nombres,
      apellido: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      password: this.password
    };

    this.authService.registerPaciente(paciente).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Error al registrar paciente', err)
    });
  }
}
