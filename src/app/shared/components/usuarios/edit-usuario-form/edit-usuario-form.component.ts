import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@shared/components/material/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule } from 'lucide-angular';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-edit-usuario-form',
  templateUrl: './edit-usuario-form.component.html',
  styleUrl: './edit-usuario-form.component.css',
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
export class EditUsuarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  usuarioId: string | null = null;
  currentPassword: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private usuarioService: UsuarioService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get('id');
    this.usuarioService.getById(+(this.usuarioId!)).subscribe((usuario) => {
      console.log(usuario)
      this.currentPassword = usuario.data?.password || null;
      this.addressForm = this.fb.group({
        nombre: [usuario.data?.nombre as never, Validators.required],
        apellido: [usuario.data?.apellido as never, Validators.required],
        email: [usuario.data?.email as never, Validators.required],
        password: [usuario.data?.password as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoApellido = this.addressForm.get('apellido')?.value;
      const nuevoEmail = this.addressForm.get('email')?.value;
      const nuevoPassword = this.addressForm.get('password')?.value;
      if (this.usuarioId) {
        this.usuarioService.update(+(this.usuarioId), { nombre: nuevoNombre!,
          apellido: nuevoApellido!,
          email: nuevoEmail!,
          password: nuevoPassword!
         }).subscribe(
          (response) => {
            console.log('Usuario actualizado:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar el usuario:', error);
            this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        );
      }
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
