import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DocenteDatatableComponent } from '@shared/components/docente-datatable/docente-datatable.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent,MatSlideToggleModule,DocenteDatatableComponent],
  templateUrl: './docente.component.html',
})

export default class DocenteComponent {

}
