import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaDatatableComponent } from '@shared/components/materia/datatable-materia/materia-datatable.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule,TitleComponent,MateriaDatatableComponent,MaterialModule],
  templateUrl: './materia.component.html',
})

export default class MateriaComponent {
  constructor(private router: Router) { }

  navigateCrearMateria() {
    this.router.navigateByUrl("dashboard/crear-materia");
  }
}
