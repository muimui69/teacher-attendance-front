import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MateriaDatableDataSource } from './materia-datatable-datasource';
import { DatumM } from '@interfaces/materia.interface';
import { MateriaService } from '@services/materia.service';


@Component({
  selector: 'app-materia-datatable',
  templateUrl: './materia-datatable.component.html',
  styleUrl: './materia-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class MateriaDatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DatumM>;
  dataSource = new MateriaDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre','sigla','nombre_c', 'acciones'];


  constructor(
    private materiaService: MateriaService,
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
    this.materiaService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
      console.log(data)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarMateria(materia: DatumM): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.materiaService.delete(materia.id).subscribe(
      () => {
        this.snackBar.open('Materia eliminada exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar el Materia:', error);
        this.snackBar.open('Error al eliminar el Materia', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarMateria(materia: DatumM) {
    this.router.navigateByUrl(`dashboard/editar-materia/${materia.id}`);
  }

}
