import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← Importante para usar ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    usernameOrEmail: '',
    password: ''
  };

  login() {
    console.log(this.loginForm);
    // Aquí puedes llamar a AuthService para autenticar
  }
}




