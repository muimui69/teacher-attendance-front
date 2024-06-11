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
import { forkJoin } from 'rxjs';
import { Datum } from '@interfaces/carrera.interface';
import { MateriaService } from '@services/materia.service';
import { CarreraService } from '@services/carrera.service';

@Component({
  selector: 'app-edit-aula-form',
  templateUrl: './edit-materia-form.component.html',
  styleUrl: './edit-materia-form.component.css',
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
export class EditMateriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  materiaId: string | null = null;
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.materiaId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      aula: this.materiaService.getById(+(this.materiaId!)),
      carreras: this.carreraService.getAll()
    }).subscribe(({ aula, carreras }) => {
      this.addressForm = this.fb.group({
        nombre: [aula.data?.nombre as never, Validators.required],
        sigla: [aula.data?.sigla as never, Validators.required],
        carreraId: [aula.data?.carrera.id as never, Validators.required],
      });
      this.carreras = carreras.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoSigla = this.addressForm.get('sigla')?.value;
      const nuevoCarreraId = this.addressForm.get('carreraId')?.value;
      if (this.materiaId) {
        this.materiaService.update(+(this.materiaId),{
          nombre: nuevoNombre!,
          sigla: nuevoSigla!,
          carreraId: nuevoCarreraId!
        }).subscribe(
          (response) => {
            console.log('Materia actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar el Materia:', error);
            this.snackBar.open('Error al actualizar el Materia', 'Cerrar', {
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
    sigla: [null, Validators.required],
    carreraId: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/materia');
  }
}
