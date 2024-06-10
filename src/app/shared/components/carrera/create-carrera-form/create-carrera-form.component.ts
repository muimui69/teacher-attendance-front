import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CarreraService } from '@services/carrera.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-carrera-form',
  templateUrl: './create-carrera-form.component.html',
  styleUrl: './create-carrera-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class CreateCarreraFormComponent {
  private fb = inject(FormBuilder);

  constructor(
    private carreraService: CarreraService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      this.carreraService.create({ nombre: nuevoNombre! }).subscribe(
        (response) => {
          console.log('Carrera creada:', response);
          // alert('¡Carrera creada exitosamente!');
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la carrera:', error);
          // alert('Error al crear la carrera. Inténtalo de nuevo.');
        }
      );
    }
  }
  
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/carrera');
  }

}
