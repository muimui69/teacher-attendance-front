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
import { UsuarioService } from '@services/usuario.service';


@Component({
  selector: 'app-create-usuario-form',
  templateUrl: './create-usuario-form.component.html',
  styleUrl: './create-usuario-form.component.css',
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
export class CreateUsuarioFormComponent {
  private fb = inject(FormBuilder);

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private usuarioService: UsuarioService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoApellido = this.addressForm.get('apellido')?.value;
      const nuevoEmail = this.addressForm.get('email')?.value;
      const nuevoPassword = this.addressForm.get('password')?.value;
      this.usuarioService.create({ nombre: nuevoNombre!,
        apellido: nuevoApellido!,
        email: nuevoEmail!,
        password: nuevoPassword!}).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          this.snackBar.open('Usuario creado exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear al Usuario:', error);
          this.snackBar.open('Error al crear al Usuario', 'Cerrar', {
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
    apellido: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente');
  }

}
