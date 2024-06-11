import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AulaDatatableComponent } from '@shared/components/aula/datatable-aula/aula-datatable.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [CommonModule, TitleComponent,AulaDatatableComponent,MaterialModule],
  templateUrl: './aula.component.html',
})

export default class AulaComponent {
  constructor(private router: Router) { }

  navigateCrearAula() {
    this.router.navigateByUrl("dashboard/crear-aula");
  }
}
