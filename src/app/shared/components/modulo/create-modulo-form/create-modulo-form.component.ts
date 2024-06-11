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
import { ModuloService } from '@services/modulo.service';


@Component({
  selector: 'app-create-modulo-form',
  templateUrl: './create-modulo-form.component.html',
  styleUrl: './create-modulo-form.component.css',
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

export class CreateModuloFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private moduloService: ModuloService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNumero = this.addressForm.get('numero')?.value;
      const nuevoUbicacion = this.addressForm.get('ubicacion')?.value;

      this.moduloService.create({
        numero: nuevoNumero!,
        ubicacion:nuevoUbicacion!
      }).subscribe(
        (response) => {
          console.log('Modulo creado:', response);
          this.snackBar.open('Modulo creado exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear el Modulo:', error);
          this.snackBar.open('Error al crear el Modulo', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  addressForm = this.fb.group({
    numero: [null, Validators.required],
    ubicacion: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/modulo');
  }

}
