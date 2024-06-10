import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '@shared/components/material/material.module';
import { TitleComponent } from '@shared/components/title/title.component';
import { CarreraDatatableComponent } from '../../../shared/components/carrera/carrera-datatable/carrera-datatable.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [CommonModule, TitleComponent, MatSlideToggleModule, CarreraDatatableComponent, MaterialModule],
  templateUrl: './carrera.component.html',
})
export default class CarreraComponent {

}
