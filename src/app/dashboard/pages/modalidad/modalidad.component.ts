import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-modalidad',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './modalidad.component.html',
})
export default class ModalidadComponent {

}
