import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ModalidadDatatableDataSource } from './modalidad-datatable-datasource';
import { CarreraService } from '@services/carrera.service';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalidadService } from '@services/modalidad.service';
import { Datum } from '@interfaces/modalidad.interface';


@Component({
  selector: 'app-modalidad-datatable',
  templateUrl: './modalidad-datatable.component.html',
  styleUrl: './modalidad-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})

export class ModalidadDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new ModalidadDatatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre', 'descripcion', 'acciones'];


  constructor(
    private modalidadService: ModalidadService,
    private iconService: IconService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }


  ngOnInit(): void {
    this.modalidadService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarModalidad(modalidad: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.modalidadService.delete(modalidad.id).subscribe(
      () => {
        this.snackBar.open('¡Modalidad eliminada exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar la Modalidad:', error);
        this.snackBar.open('Error al eliminar la Modalidad', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarModalidad(modalidad: Datum) {
    this.router.navigateByUrl(`dashboard/editar-modalidad/${modalidad.id}`);
  }

}
