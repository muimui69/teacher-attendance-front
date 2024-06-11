import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@shared/components/material/material.module';
import { PeriodoDatatableComponent } from '@shared/components/periodo/datatable-periodo/periodo-datatable.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-periodo',
  standalone: true,
  imports: [CommonModule, TitleComponent, PeriodoDatatableComponent, MaterialModule],
  templateUrl: './periodo.component.html',
})

export default class PeriodoComponent {
  constructor(private router: Router) { }

  navigateCrearPeriodo() {
    this.router.navigateByUrl("dashboard/crear-periodo");
  }
}
