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
import { GrupoService } from '@services/grupo.service';


@Component({
  selector: 'app-create-grupo-form',
  templateUrl: './create-grupo-form.component.html',
  styleUrl: './create-grupo-form.component.css',
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
export class CreateGrupoFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private  grupoService: GrupoService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      this.grupoService.create({ nombre: nuevoNombre! }).subscribe(
        (response) => {
          console.log('Grupo creada:', response);
          this.snackBar.open('Grupo creada exitosamente!', 'Cerrar', {
            duration: 3000, 
            horizontalPosition: 'right', 
            verticalPosition: 'bottom', 
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Grupo:', error);
          this.snackBar.open('Error al crear la Grupo', 'Cerrar', {
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
    this.router.navigateByUrl('/dashboard/grupo');
  }

}
