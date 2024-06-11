import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@shared/components/material/material.module';
import { ModuloDatatableComponent } from '@shared/components/modulo/datatable-modulo/datatable-modulo.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule, TitleComponent,ModuloDatatableComponent, MaterialModule],
  templateUrl: './modulo.component.html',
})

export default class ModuloComponent {
  constructor(private router: Router) {}

  navigateCrearModulo() {
    this.router.navigateByUrl("dashboard/crear-modulo");
  }

}
