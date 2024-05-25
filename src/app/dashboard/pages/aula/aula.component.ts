import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './aula.component.html',
})

export default class AulaComponent {

}
