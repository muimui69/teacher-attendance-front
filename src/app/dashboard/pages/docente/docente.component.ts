import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './docente.component.html',
})

export default class DocenteComponent {

}
