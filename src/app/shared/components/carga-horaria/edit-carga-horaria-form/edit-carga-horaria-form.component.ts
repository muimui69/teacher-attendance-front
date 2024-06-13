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
import { MateriaService } from '@services/materia.service';
import { DatumU } from '@interfaces/usuario.interface';
import { DatumM } from '@interfaces/materia.interface';
import { DatumMo } from '@interfaces/modalidad.interface';
import { DatumP } from '@interfaces/periodo.interface';
import { CargaHorariaService } from '@services/cargahoraria.service';
import { UsuarioService } from '@services/usuario.service';
import { PeriodoService } from '@services/periodo.service';
import { ModalidadService } from '@services/modalidad.service';

@Component({
  selector: 'app-edit-carga-horaria-form',
  templateUrl: './edit-carga-horaria-form.component.html',
  styleUrl: './edit-carga-horaria-form.component.css',
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
export class EditCargaHorariaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  cargahorariaId: string | null = null;
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cargahorariaId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      cargahoraria: this.cargahorariaService.getById(+(this.cargahorariaId!)),
      docentes: this.usuarioService.getAll(),
      materias: this.materiaService.getAll(),
      modalidades: this.modalidadService.getAll(),
      periodos: this.periodoService.getAll(),
    }).subscribe(({ cargahoraria, docentes, materias, modalidades, periodos}) => {
      this.addressForm = this.fb.group({
        id_docente: [cargahoraria.data?.docente.id as never, Validators.required],
        id_materia: [cargahoraria.data?.materia.id as never, Validators.required],
        id_modalidad: [cargahoraria.data?.modalidad.id as never, Validators.required],
        id_periodo: [cargahoraria.data?.periodo.id as never, Validators.required],
      });
      this.docentes = docentes.data;
      this.materias = materias.data;
      this.modalidades = modalidades.data;
      this.periodos = periodos.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoDocente = this.addressForm.get('id_docente')?.value;
      const nuevaMateria = this.addressForm.get('id_materia')?.value;
      const nuevaModalida = this.addressForm.get('id_modalidad')?.value;
      const nuevoPeriodo = this.addressForm.get('id_periodo')?.value;
      if (this.cargahorariaId) {
        this.cargahorariaService.update(+(this.cargahorariaId),{
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
    id_docente: [null, Validators.required],
    id_materia: [null, Validators.required],
    id_modalidad: [null, Validators.required],
    id_periodo: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/docente/asignar-materia-docente');
  }
}
