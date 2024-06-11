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
import { AulaService } from '@services/aula.service';
import { forkJoin } from 'rxjs';
import { ModuloService } from '@services/modulo.service';
import { Datum } from '@interfaces/modulo.interface';

@Component({
  selector: 'app-edit-aula-form',
  templateUrl: './edit-aula-form.component.html',
  styleUrl: './edit-aula-form.component.css',
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
export class EditAulaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  aulaId: string | null = null;
  modulos: Datum[] = [];

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private aulaService: AulaService,
    private moduloService: ModuloService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.aulaId = this.route.snapshot.paramMap.get('id');

    forkJoin({
      aula: this.aulaService.getById(+(this.aulaId!)),
      modulos: this.moduloService.getAll()
    }).subscribe(({ aula, modulos }) => {
      this.addressForm = this.fb.group({
        nombre: [aula.data?.nombre as never, Validators.required],
        moduloId: [aula.data?.modulo.id as never, Validators.required],
      });
      this.modulos = modulos.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoModuloId = this.addressForm.get('moduloId')?.value;
      if (this.aulaId) {
        this.aulaService.update(+(this.aulaId),{
          nombre: nuevoNombre!,
          moduloId:nuevoModuloId!
        }).subscribe(
          (response) => {
            console.log('Aula actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar el Aula:', error);
            this.snackBar.open('Error al actualizar el Aula', 'Cerrar', {
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
    moduloId: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/aula');
  }
}
