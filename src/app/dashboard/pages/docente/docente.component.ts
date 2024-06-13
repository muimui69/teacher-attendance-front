import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '@shared/components/material/material.module';
import { Router } from '@angular/router';
import { UsuarioDatatableComponent } from '@shared/components/usuarios/usuario-datatable/usuario-datatable.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, UsuarioDatatableComponent, MaterialModule],
  templateUrl: './docente.component.html',
})

export default class DocenteComponent {
  constructor(private router: Router) { }

  navigateCrearUsuario() {
    this.router.navigateByUrl("dashboard/crear-usuario");
  }

}
