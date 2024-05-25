import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './reporte.component.html',
})

export default class ReporteComponent {

}
