import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-register',
  standalone: true,
  templateUrl: './select-register.component.html',
  styleUrls: ['./select-register.component.css'],
  imports: [],
})
export class SelectRegisterComponent {
  constructor(private router: Router) {}

  navigateTo(tipo: string) {
    this.router.navigate([`/register/${tipo}`]);
  }
}
