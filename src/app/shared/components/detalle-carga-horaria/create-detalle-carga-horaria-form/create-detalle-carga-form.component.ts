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
import { DatumD } from '@interfaces/dia.interface';
import { CargaHorariaService } from '@services/cargahoraria.service';
import { DatumA } from '@interfaces/aula.interface';
import { DatumG } from '@interfaces/grupo.interface';
import { DiaService } from '@services/dia.service';
import { GrupoService } from '@services/grupo.service';
import { AulaService } from '@services/aula.service';
import { DetalleCargaHorariaService } from '@services/detallecargahoraria.service';


@Component({
  selector: 'app-create-detalle-carga-form',
  templateUrl: './create-detalle-carga-form.component.html',
  styleUrl: './create-detalle-carga-form.component.css',
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

export class CreateDetalleCargaHorariaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  cargahorarias: Datum[] = [];
  dias: DatumD[] = [];
  aulas: DatumA[] = [];
  grupos: DatumG[] = [];

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private detalleCargaHorariaService: DetalleCargaHorariaService,
    private cargahorariaService: CargaHorariaService,
    private diaService: DiaService,
    private grupoService: GrupoService,
    private aulaService: AulaService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.diaService.getAll().subscribe((dia) => {
      this.dias = dia.data;
    });
    this.aulaService.getAll().subscribe((aula) => {
      this.aulas = aula.data;
    });
    this.grupoService.getAll().subscribe((grupo) => {
      this.grupos = grupo.data;
    });
    this.cargahorariaService.getAll().subscribe((cargahoraria) => {
      this.cargahorarias = cargahoraria.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoHoraInicio = this.addressForm.get('hora_inicio')?.value;
      const nuevaHoraFin = this.addressForm.get('hora_fin')?.value;
      const nuevaAula = this.addressForm.get('aulaId')?.value;
      const nuevoCargaHoraria = this.addressForm.get('cargaHorariaId')?.value;
      const nuevoDia = this.addressForm.get('diaId')?.value;
      const nuevoGrupo = this.addressForm.get('grupoId')?.value;
      this.detalleCargaHorariaService.create({
        hora_inicio: nuevoHoraInicio!,
        hora_fin: nuevaHoraFin!,
        aulaId: nuevaAula!,
        cargaHorariaId: nuevoCargaHoraria!,
        diaId: nuevoDia!,
        grupoId: nuevoGrupo!,
      }).subscribe(
        (response) => {
          console.log('Detalle de la carga horaria creada:', response);
          this.snackBar.open('Detalle de la carga horaria exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear el detalle de la carga horaria:', error);
          this.snackBar.open('Error al crear el detalle de la carga horaria: ' + error.error.message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  addressForm = this.fb.group({
    hora_inicio: [null, Validators.required],
    hora_fin: [null, Validators.required],
    aulaId: [null, Validators.required],
    cargaHorariaId: [null, Validators.required],
    diaId: [null, Validators.required],
    grupoId: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente/asignar-detalle-carga-docente');
  }

}
