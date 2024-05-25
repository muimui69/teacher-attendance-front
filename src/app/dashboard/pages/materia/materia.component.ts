import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule,TitleComponent],
  templateUrl: './materia.component.html',
})

export default class MateriaComponent {

}
