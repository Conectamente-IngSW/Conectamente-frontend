import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PsicologoService, VisualizarPsicologoDTO } from '../../../../core/services/psicologo.service';
import { CommonModule } from '@angular/common';


// Angular Material
import {ChangeDetectionStrategy, model} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, 
    CommonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatIconModule, 
    MatIconModule,
    MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {

  //calendario
  selected = model<Date | null>(null);

  psicologo!: VisualizarPsicologoDTO;

  constructor(
  private route: ActivatedRoute,
  private psicologoService: PsicologoService
) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.psicologoService.getPsicologoPorId(+id).subscribe({
      next: psicologo => this.psicologo = psicologo,
      error: err => console.error('Error al obtener psicólogo:', err)
    });
  } else {
    console.warn('ID de psicólogo no proporcionado en la ruta.');
  }
}
}