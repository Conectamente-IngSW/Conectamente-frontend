import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarLandingComponent } from './shared/components/navbar_landing/navbar-landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, NavbarComponent, FooterComponent, NavbarLandingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conectamente-frontend';
  private router = inject(Router);

  shouldShowLandingNavbar(): boolean {
    const currentUrl = this.router.url;
    // Show landing navbar on landing pages, auth pages (including register), and root
    return currentUrl.includes('/landing') || 
           currentUrl === '/' || 
           currentUrl === '/auth' || 
           currentUrl.includes('/auth/') ||
           currentUrl.includes('/registro');
  }

  shouldShowMainNavbar(): boolean {
    const currentUrl = this.router.url;
    // Show main navbar on authenticated user pages (but not on register pages)
    return (currentUrl.includes('/paciente') && !currentUrl.includes('/registro')) || 
           (currentUrl.includes('/psicologo') && !currentUrl.includes('/registro')) || 
           currentUrl.includes('/admin');
  }
}
