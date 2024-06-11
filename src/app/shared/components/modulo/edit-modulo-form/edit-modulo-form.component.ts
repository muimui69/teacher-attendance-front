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
import { ModuloService } from '@services/modulo.service';

@Component({
  selector: 'app-edit-carrera-form',
  templateUrl: './edit-modulo-form.component.html',
  styleUrl: './edit-modulo-form.component.css',
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

export class EditModuloFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  moduloId: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private moduloService: ModuloService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.moduloId = this.route.snapshot.paramMap.get('id');
    this.moduloService.getById(+(this.moduloId!)).subscribe((modulo) => {
      console.log(modulo)
      this.addressForm = this.fb.group({
        numero: [modulo.data?.numero as never, Validators.required],
        ubicacion: [modulo.data?.ubicacion as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNumero = this.addressForm.get('numero')?.value;
      const nuevoUbicacion = this.addressForm.get('ubicacion')?.value;
      if (this.moduloId) {
        this.moduloService.update(+(this.moduloId), { 
          numero: nuevoNumero!, 
          ubicacion:nuevoUbicacion!
        }).subscribe(
          (response) => {
            console.log('Modulo actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000, 
              horizontalPosition: 'right', 
              verticalPosition: 'bottom', 
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar el modulo:', error);
            this.snackBar.open('Error al actualizar el modulo', 'Cerrar', {
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
    numero: [null, Validators.required],
    ubicacion: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/modulo');
  }
}
