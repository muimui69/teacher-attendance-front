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
import { LicenciaService } from '@services/licencia.service';

@Component({
  selector: 'app-edit-licencia-form',
  templateUrl: './edit-licencia-form.component.html',
  styleUrl: './edit-licencia-form.component.css',
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
export class EditLicenciaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  licenciaId: string | null = null;
  currentPassword: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private licenciaService: LicenciaService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.licenciaId = this.route.snapshot.paramMap.get('id');
    this.licenciaService.getById(+(this.licenciaId!)).subscribe((licencia) => {
      console.log(licencia)
      this.addressForm = this.fb.group({
        titulo: [licencia.data?.titulo as never, Validators.required],
        descripcion: [licencia.data?.descripcion as never, Validators.required],
        fecha: [licencia.data?.fecha as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoTitulo = this.addressForm.get('titulo')?.value;
      const nuevaDescripcion = this.addressForm.get('descripcion')?.value;
      const nuevaFecha = this.addressForm.get('fecha')?.value;
      if (this.licenciaId) {
        this.licenciaService.update(+(this.licenciaId), { titulo: nuevoTitulo!,
          descripcion: nuevaDescripcion!,
          fecha: nuevaFecha!,
         }).subscribe(
          (response) => {
            console.log('Licencia actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la licencia:', error);
            this.snackBar.open('Error al actualizar la licencia', 'Cerrar', {
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
    titulo: [null, Validators.required],
    descripcion: [null, Validators.required],
    fecha: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente/licencia-docente');
  }
}
