import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CarreraService } from '@services/carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@shared/components/material/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule } from 'lucide-angular';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ModalidadService } from '@services/modalidad.service';

@Component({
  selector: 'app-edit-modalidad-form',
  templateUrl: './edit-modalidad-form.component.html',
  styleUrl: './edit-modalidad-form.component.css',
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
export class EditModalidadFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  modalidadId: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private modalidadService: ModalidadService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.modalidadId = this.route.snapshot.paramMap.get('id');
    this.modalidadService.getById(+(this.modalidadId!)).subscribe((modalidad) => {
      console.log(modalidad)
      this.addressForm = this.fb.group({
        nombre: [modalidad.data?.nombre as never, Validators.required],
        descripcion: [modalidad.data?.descripcion as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoDescripcion = this.addressForm.get('descripcion')?.value;
      if (this.modalidadId) {
        this.modalidadService.update(+(this.modalidadId), {
          nombre: nuevoNombre!,
          descripcion: nuevoDescripcion!
        }).subscribe(
          (response) => {
            console.log('Modalidad actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la Modalidad:', error);
            this.snackBar.open('Error al actualizar la Modalidad', 'Cerrar', {
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
    descripcion: [null, Validators.required],
  });


  volverAtras() {
    this.router.navigateByUrl('/dashboard/modalidad');
  }
}
