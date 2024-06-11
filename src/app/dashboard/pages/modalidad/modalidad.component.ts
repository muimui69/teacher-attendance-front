import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@shared/components/material/material.module';
import { ModalidadDatatableComponent } from '@shared/components/modalidad/datatable-modalidad/modalidad-datatable.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-modalidad',
  standalone: true,
  imports: [CommonModule, TitleComponent, ModalidadDatatableComponent, MaterialModule],
  templateUrl: './modalidad.component.html',
})
export default class ModalidadComponent {
  constructor(private router: Router) { }

  navigateCrearModalidad() {
    this.router.navigateByUrl("dashboard/crear-modalidad");
  }

}
