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
import { Datum } from '@interfaces/carga-horaria.interface';
import { DatumM } from '@interfaces/materia.interface';
import { DatumU } from '@interfaces/usuario.interface';
import { DatumP } from '@interfaces/periodo.interface';

import { CargaHorariaService } from '@services/cargahoraria.service';
import { UsuarioService } from '@services/usuario.service';
import { MateriaService } from '@services/materia.service';
import { ModalidadService } from '@services/modalidad.service';
import { PeriodoService } from '@services/periodo.service';
import { DatumMo } from '@interfaces/modalidad.interface';


@Component({
  selector: 'app-create-carga-horaria-form',
  templateUrl: './create-carga-horaria-form.component.html',
  styleUrl: './create-carga-horaria-form.component.css',
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
export class CreateCargaHorariaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  docentes: DatumU[] = [];
  materias: DatumM[] = [];
  modalidades: DatumMo[] = [];
  periodos: DatumP[] = [];

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private cargahorariaService: CargaHorariaService,
    private usuarioService: UsuarioService,
    private periodoService: PeriodoService,
    private materiaService: MateriaService,
    private modalidadService: ModalidadService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.usuarioService.getAll().subscribe((docente) => {
      this.docentes = docente.data;
    });
    this.materiaService.getAll().subscribe((materia) => {
      this.materias = materia.data;
    });
    this.modalidadService.getAll().subscribe((modalidad) => {
      this.modalidades = modalidad.data;
    });
    this.periodoService.getAll().subscribe((periodo) => {
      this.periodos = periodo.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoDocente = this.addressForm.get('id_docente')?.value;
      const nuevaMateria = this.addressForm.get('id_materia')?.value;
      const nuevaModalida = this.addressForm.get('id_modalidad')?.value;
      const nuevoPeriodo = this.addressForm.get('id_periodo')?.value;
      this.cargahorariaService.create({
        id_docente: nuevoDocente!,
        id_materia: nuevaMateria!,
        id_modalidad: nuevaModalida!,
        id_periodo: nuevoPeriodo!
      }).subscribe(
        (response) => {
          console.log('Carga horaria creada:', response);
          this.snackBar.open('Carga horaria exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Carga horaria:', error);
          this.snackBar.open('Error al crear la Carga horaria', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  addressForm = this.fb.group({
    id_docente: [null, Validators.required],
    id_materia: [null, Validators.required],
    id_modalidad: [null, Validators.required],
    id_periodo: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente/asignar-materia-docente');
  }

}
