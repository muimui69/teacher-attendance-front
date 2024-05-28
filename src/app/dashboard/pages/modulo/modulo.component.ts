import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './modulo.component.html',
})

export default class ModuloComponent {

}
