import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CarreraService } from '@services/carrera.service';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeriodoDatableDataSource } from './periodo-datatable-datasource';
import { PeriodoService } from '@services/periodo.service';
import { Datum } from '@interfaces/periodo.interface';


@Component({
  selector: 'app-periodo-datatable',
  templateUrl: './periodo-datatable.component.html',
  styleUrl: './periodo-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, LucideAngularModule,MaterialModule]
})
export class PeriodoDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new PeriodoDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre','gestion','fecha_inicio','fecha_fin', 'acciones'];


  constructor(
    private periodoService: PeriodoService,
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
    this.periodoService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarPeriodo(periodo: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.periodoService.delete(periodo.id).subscribe(
      () => {
        this.snackBar.open('Periodo eliminada exitosamente!', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right', 
          verticalPosition: 'bottom', 
        });
      },
      (error) => {
        console.error('Error al eliminar el Periodo:', error);
        this.snackBar.open('Error al crear el Periodo', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarPeriodo(periodo: Datum) {
    this.router.navigateByUrl(`dashboard/editar-periodo/${periodo.id}`);
  }

}
