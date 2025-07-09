import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-landing.component.html',
  styleUrl: './navbar-landing.component.css'
})
export class NavbarLandingComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
