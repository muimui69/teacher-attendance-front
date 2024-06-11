import { Component, Inject, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
import { PeriodoService } from '@services/periodo.service';
import { MaterialModule } from '@shared/components/material/material.module';

@Component({
  selector: 'app-create-periodo-form',
  templateUrl: './create-periodo-form.component.html',
  styleUrl: './create-periodo-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
    MaterialModule
  ],
})

export class CreatePeriodoFormComponent {
  private fb = inject(FormBuilder);


  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private periodoService: PeriodoService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
 
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoGestion = this.addressForm.get('gestion')?.value;
      const nuevoFechaInicio = this.addressForm.get('fecha_inicio')?.value?.toISOString().split('T')[0];
      const nuevoFechaFin = this.addressForm.get('fecha_fin')?.value?.toISOString().split('T')[0];;
      this.periodoService.create({
        nombre: nuevoNombre!,
        gestion: +nuevoGestion!,
        fecha_inicio: nuevoFechaInicio! as never,
        fecha_fin: nuevoFechaFin! as never,
      }).subscribe(
        (response) => {
          console.log('Periodo creada:', response);
          this.snackBar.open('¡Periodo creada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Periodo:', error);
          this.snackBar.open('Error al crear la Periodo', 'Cerrar', {
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
    gestion: [null, Validators.required],
    fecha_inicio: new FormControl<Date | null>(null),
    fecha_fin: new FormControl<Date | null>(null),
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/periodo');
  }

}
