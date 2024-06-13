import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { LicenciaService } from '@services/licencia.service';
import { MaterialModule } from '@shared/components/material/material.module';


@Component({
  selector: 'app-create-licencia-form',
  templateUrl: './create-licencia-form.component.html',
  styleUrl: './create-licencia-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    LucideAngularModule
  ]
})
export class CreateLicenciaFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private licenciaService: LicenciaService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoTitulo = this.addressForm.get('titulo')?.value;
      const nuevoDescripcion = this.addressForm.get('descripcion')?.value;
      const nuevoFecha = this.addressForm.get('fecha')?.value;
      this.licenciaService.create({ titulo: nuevoTitulo!,
        descripcion: nuevoDescripcion!,
        fecha: nuevoFecha!}).subscribe(
        (response) => {
          console.log('Licencia registrada:', response);
          this.snackBar.open('Licencia registrada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al registrar la licencia:', error);
          this.snackBar.open('Error al registrar la licencia', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  addressForm = this.fb.group({
    titulo: [null, Validators.required],
    descripcion: [null, Validators.required],
    fecha: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente/licencia-docente');
  }

}
