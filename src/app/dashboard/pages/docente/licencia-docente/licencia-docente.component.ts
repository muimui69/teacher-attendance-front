import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '@shared/components/material/material.module';
import { Router } from '@angular/router';
import { LicenciaDatatableComponent } from '@shared/components/licencia/licencia-datatable/licencia-datatable.component';

@Component({
  selector: 'app-licencia-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, LicenciaDatatableComponent, MaterialModule],
  templateUrl: './licencia-docente.component.html',
  styles: ``
})
export default class licenciaDocenteComponent {

  constructor(private router: Router) { }

  navigateCrearLicencia() {
    this.router.navigateByUrl("dashboard/docente/crear-licencia");
  }

}
