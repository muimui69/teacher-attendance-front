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

@Component({
  selector: 'app-edit-carrera-form',
  templateUrl: './edit-carrera-form.component.html',
  styleUrl: './edit-carrera-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class EditCarreraFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  carreraId: string | null = null;

  constructor(
    private carreraService: CarreraService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carreraId = this.route.snapshot.paramMap.get('id');
    this.carreraService.getById(+(this.carreraId!)).subscribe((carrera) => {
      console.log(carrera)
      this.addressForm = this.fb.group({
        nombre: [carrera.data?.nombre as never, Validators.required],
      });
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const nuevoNombre = this.addressForm.get('nombre')?.value;
      if (this.carreraId) {
        this.carreraService.update(+(this.carreraId), { nombre: nuevoNombre! }).subscribe(
          (response) => {
            console.log('Carrera actualizada:', response);
            this.volverAtras()
          },
          (error) => {
            console.error('Error al actualizar la carrera:', error);
          }
        );
      } 
    }
  }

  addressForm = this.fb.group({
    nombre: [null, Validators.required],
  });

  volverAtras() {
    this.router.navigateByUrl('/dashboard/carrera');
  }
}
