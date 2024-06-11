import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { PeriodoService } from '@services/periodo.service';

@Component({
  selector: 'app-edit-periodo-form',
  templateUrl: './edit-periodo-form.component.html',
  styleUrl: './edit-periodo-form.component.css',
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
export class EditPeriodoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  periodoId: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private periodoService: PeriodoService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.periodoId = this.route.snapshot.paramMap.get('id');
    this.periodoService.getById(+(this.periodoId!)).subscribe((periodo) => {
      console.log(periodo)

      let fecha_inicio_date = new Date(periodo.data.fecha_inicio);
      let fecha_fin_date = new Date(periodo.data.fecha_fin);

      fecha_inicio_date.setDate(fecha_inicio_date.getDate() + 1);
      fecha_fin_date.setDate(fecha_fin_date.getDate() + 1);


      this.addressForm = this.fb.group({
        nombre: [periodo.data.nombre as never, Validators.required],
        gestion: [periodo.data.gestion as never, Validators.required],
        fecha_inicio: new FormControl<Date | null>(fecha_inicio_date),
        fecha_fin: new FormControl<Date | null>(fecha_fin_date),
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoGestion = this.addressForm.get('gestion')?.value;
      const nuevoFechaInicio = this.addressForm.get('fecha_inicio')?.value?.toISOString().split('T')[0];
      const nuevoFechaFin = this.addressForm.get('fecha_fin')?.value?.toISOString().split('T')[0];;

      if (this.periodoId) {
        this.periodoService.update(+(this.periodoId), {
          nombre: nuevoNombre!,
          gestion: +nuevoGestion!,
          fecha_inicio: nuevoFechaInicio! as never,
          fecha_fin: nuevoFechaFin! as never,
        }).subscribe(
          (response) => {
            console.log('Carrera actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la carrera:', error);
            this.snackBar.open('Error al actualizar la carrera', 'Cerrar', {
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
    gestion: [null, Validators.required],
    fecha_inicio: new FormControl<Date | null>(null),
    fecha_fin: new FormControl<Date | null>(null),
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/periodo');
  }
}
