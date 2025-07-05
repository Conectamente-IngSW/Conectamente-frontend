import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // ✅ IMPORTACIÓN NECESARIA

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // ✅ AÑADIDO AQUÍ TAMBIÉN
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conectamente-frontend';
}
