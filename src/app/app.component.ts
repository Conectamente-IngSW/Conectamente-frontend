import { Component } from '@angular/core';


import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component"; // importa correctamente
import { NavbarLandingComponent } from './shared/components/navbar_landing/navbar-landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent, NavbarLandingComponent],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conectamente-frontend';
}
