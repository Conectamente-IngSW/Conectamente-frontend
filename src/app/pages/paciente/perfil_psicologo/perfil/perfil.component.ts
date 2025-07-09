import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PsicologoService, VisualizarPsicologoDTO } from '../../../../core/services/psicologo.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {

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