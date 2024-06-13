import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { GrupoDatatableComponent } from '@shared/components/grupo/grupo-datatable/grupo-datatable.component';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, GrupoDatatableComponent, MaterialModule],
  templateUrl: './grupo.component.html',
  styles: ``
})
export default class GrupoComponent {
  constructor(private router: Router) { }

  navigateCrearGrupo() {
    this.router.navigateByUrl("dashboard/crear-grupo");
  }
}
