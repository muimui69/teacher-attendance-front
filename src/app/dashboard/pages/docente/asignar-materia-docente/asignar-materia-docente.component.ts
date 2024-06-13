import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { CargaHorariaDatatableComponent } from '@shared/components/carga-horaria/datatable-carga-horaria/carga-horaria-datatable.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-asignar-materia-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, CargaHorariaDatatableComponent, MaterialModule],
  templateUrl: './asignar-materia-docente.component.html',
  styles: ``
})
export default class AsignarMateriaDocenteComponent {

  constructor(private router: Router) { }

  navigateCrearDetalleCarga() {
    this.router.navigateByUrl("dashboard/crear-carga-horaria");
  }

}
