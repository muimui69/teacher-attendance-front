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
import { AulaService } from '@services/aula.service';
import { MaterialModule } from '@shared/components/material/material.module';
import { ModuloService } from '@services/modulo.service';
import { Datum } from '@interfaces/modulo.interface';


@Component({
  selector: 'app-create-aula-form',
  templateUrl: './create-aula-form.component.html',
  styleUrl: './create-aula-form.component.css',
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
export class CreateAulaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
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
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.moduloService.getAll().subscribe((modulo) => {
      this.modulos = modulo.data;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      const nuevoModuloId = this.addressForm.get('moduloId')?.value;
      this.aulaService.create({ 
        nombre: nuevoNombre!,
        moduloId:nuevoModuloId!
      }).subscribe(
        (response) => {
          console.log('Aula creada:', response);
          this.snackBar.open('Aula creada exitosamente!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.volverAtras()
        },
        (error) => {
          console.error('Error al crear la Aula:', error);
          this.snackBar.open('Error al crear la Aula', 'Cerrar', {
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
    moduloId: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/aula');
  }

}
