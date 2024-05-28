import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './carrera.component.html',
  styles: ``
})
export default class CarreraComponent {

}
