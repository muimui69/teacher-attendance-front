import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, TitleComponent,RouterModule],
  templateUrl: './docente.component.html',
})

export default class DocenteComponent {

}
