import { Component, inject, OnInit } from '@angular/core';

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
import { MaterialModule } from '@shared/components/material/material.module';
import { CarreraService } from '@services/carrera.service';
import { Datum } from '@interfaces/carrera.interface';
import { MateriaService } from '@services/materia.service';


@Component({
  selector: 'app-create-materia-form',
  templateUrl: './create-materia-form.component.html',
  styleUrl: './create-materia-form.component.css',
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
  ]
})
export class CreateMateriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  carreras: Datum[] = [];

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private materiaService: MateriaService,
    private carreraService: CarreraService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.carreraService.getAll().subscribe((carrera) => {
      this.carreras = carrera.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoSigla = this.addressForm.get('sigla')?.value;
      const nuevoCarreraId = this.addressForm.get('carreraId')?.value;
      this.materiaService.create({
        nombre: nuevoNombre!,
        sigla: nuevoSigla!,
        carreraId: nuevoCarreraId!
      }).subscribe(
        (response) => {
          console.log('Materia creada:', response);
          this.snackBar.open('Materia creada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Materia:', error);
          this.snackBar.open('Error al crear la Materia', 'Cerrar', {
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
    sigla: [null, Validators.required],
    carreraId: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/materia');
  }

}
