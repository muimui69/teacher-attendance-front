import { Component, inject, OnInit, isDevMode } from '@angular/core';
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
import { Datum } from '@interfaces/carga-horaria.interface';
import { CargaHorariaService } from '@services/cargahoraria.service';
import { DatumD } from '@interfaces/dia.interface';
import { DatumA } from '@interfaces/aula.interface';
import { DatumG } from '@interfaces/grupo.interface';
import { GrupoService } from '@services/grupo.service';
import { DiaService } from '@services/dia.service';
import { AulaService } from '@services/aula.service';
import { DetalleCargaHorariaService } from '@services/detallecargahoraria.service';

@Component({
  selector: 'app-edit-detalle-carga-horaria-form',
  templateUrl: './edit-detalle-carga-form.component.html',
  styleUrl: './edit-detalle-carga-form.component.css',
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
export class EditDetalleCargaHorariaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  detallecargaId: string | null = null;
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.detallecargaId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      detallecarga: this.detalleCargaHorariaService.getById(+(this.detallecargaId!)),
      cargahorarias: this.cargahorariaService.getAll(),
      dias: this.diaService.getAll(),
      aulas: this.aulaService.getAll(),
      grupos: this.grupoService.getAll(),
    }).subscribe(({ detallecarga, cargahorarias, dias, aulas, grupos}) => {
      this.addressForm = this.fb.group({
        hora_inicio: [detallecarga.data?.hora_inicio as never, Validators.required],
        hora_fin: [detallecarga.data?.hora_fin as never, Validators.required],
        cargaHorariaId: [detallecarga.data?.cargaHoraria.id as never, Validators.required],
        aulaId: [detallecarga.data?.aula.id as never, Validators.required],
        diaId: [detallecarga.data?.dias.id as never, Validators.required],
        grupoId: [detallecarga.data?.grupo.id as never, Validators.required],
      });
      this.cargahorarias = cargahorarias.data;
      this.dias = dias.data;
      this.aulas = aulas.data;
      this.grupos = grupos.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoDocente = this.addressForm.get('id_docente')?.value;
      const nuevaMateria = this.addressForm.get('id_materia')?.value;
      const nuevaModalida = this.addressForm.get('id_modalidad')?.value;
      const nuevoPeriodo = this.addressForm.get('id_periodo')?.value;
      if (this.detallecargaId) {
        this.cargahorariaService.update(+(this.detallecargaId),{
          id_docente: nuevoDocente!,
          id_materia: nuevaMateria!,
          id_modalidad: nuevaModalida!,
          id_periodo: nuevoPeriodo!
        }).subscribe(
          (response) => {
            console.log('Carga horaria actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la Carga horaria:', error);
            this.snackBar.open('Error al actualizar la Carga horaria', 'Cerrar', {
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
