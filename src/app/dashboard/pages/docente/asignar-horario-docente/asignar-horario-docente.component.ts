import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { DetalleCargaHorariaDatatableComponent } from '@shared/components/detalle-carga-horaria/datatable-detalle-carga-horaria/detalle-carga-datatable.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-asignar-detalle-carga-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, DetalleCargaHorariaDatatableComponent, MaterialModule],
  templateUrl: './asignar-horario-docente.component.html',
  styles: ``
})
export default class AsignarHorarioDocenteComponent {

  constructor(private router: Router) { }

  navigateCrearCargaHoraria() {
    this.router.navigateByUrl("dashboard/crear-detalle-carga");
  }

}
