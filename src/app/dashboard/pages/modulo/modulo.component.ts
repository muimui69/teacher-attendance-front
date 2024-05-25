import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './modulo.component.html',
})

export default class ModuloComponent {

}
