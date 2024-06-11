import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ModalidadService } from '@services/modalidad.service';


@Component({
  selector: 'app-create-modalidad-form',
  templateUrl: './create-modalidad-form.component.html',
  styleUrl: './create-modalidad-form.component.css',
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
export class CreateModalidadFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private modalidadService: ModalidadService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoDescripcion = this.addressForm.get('descripcion')?.value;
      this.modalidadService.create({
        nombre: nuevoNombre!,
        descripcion: nuevoDescripcion!
      }).subscribe(
        (response) => {
          console.log('Modalidad creada:', response);
          this.snackBar.open('Modalidad creada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Modalidad:', error);
          this.snackBar.open('Error al crear la Modalidad', 'Cerrar', {
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
    descripcion: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/modalidad');
  }

}
