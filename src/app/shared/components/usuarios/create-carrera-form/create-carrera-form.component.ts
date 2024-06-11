import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CarreraService } from '@services/carrera.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';


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
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule
  ]
})
export class CreateCarreraFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private carreraService: CarreraService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      this.carreraService.create({ nombre: nuevoNombre! }).subscribe(
        (response) => {
          console.log('Carrera creada:', response);
          this.snackBar.open('¡Carrera creada exitosamente!', 'Cerrar', {
            duration: 3000, 
            horizontalPosition: 'right', 
            verticalPosition: 'bottom', 
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la carrera:', error);
          this.snackBar.open('Error al crear la carrera', 'Cerrar', {
            duration: 3000, 
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
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
