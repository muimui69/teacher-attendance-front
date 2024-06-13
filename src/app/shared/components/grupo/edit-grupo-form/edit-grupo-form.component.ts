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
import { GrupoService } from '@services/grupo.service';

@Component({
  selector: 'app-edit-grupo-form',
  templateUrl: './edit-grupo-form.component.html',
  styleUrl: './edit-grupo-form.component.css',
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

export class EditGrupoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  grupoId: string | null = null;

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  constructor(
    private grupoService: GrupoService,
    private iconService: IconService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.grupoId = this.route.snapshot.paramMap.get('id');
    this.grupoService.getById(+(this.grupoId!)).subscribe((grupo) => {
      console.log(grupo)
      this.addressForm = this.fb.group({
        nombre: [grupo.data?.nombre as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      if (this.grupoId) {
        this.grupoService.update(+(this.grupoId), { nombre: nuevoNombre! }).subscribe(
          (response) => {
            console.log('Grupo actualizada:', response);
            this.snackBar.open('¡Cambios guardados exitosamente!', 'Cerrar', {
              duration: 3000, 
              horizontalPosition: 'right', 
              verticalPosition: 'bottom', 
            });
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la Grupo:', error);
            this.snackBar.open('Error al actualizar la Grupo', 'Cerrar', {
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
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/grupo');
  }
}
