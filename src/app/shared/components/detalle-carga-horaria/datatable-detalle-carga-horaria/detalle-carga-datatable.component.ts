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
import { Datum } from '@interfaces/detalle-carga-horaria.interface';
import { DetalleCargaHorariaDatableDataSource } from './detalle-carga-datatable-datasource';
import { DetalleCargaHorariaService } from '@services/detallecargahoraria.service';


@Component({
  selector: 'app-detalle-carga-datatable',
  templateUrl: './detalle-carga-datatable.component.html',
  styleUrl: './detalle-carga-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class DetalleCargaHorariaDatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new DetalleCargaHorariaDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['cargahoraria', 'dia', 'hora_inicio','hora_fin', 'aula', 'grupo', 'acciones'];


  constructor(
    private detalleCargahorariaService: DetalleCargaHorariaService,
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
    this.detalleCargahorariaService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
      console.log(data)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarDetalleCargaHoraria(detallecargahoraria: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.detalleCargahorariaService.delete(detallecargahoraria.id).subscribe(
      () => {
        this.snackBar.open('detalle de carga horaria eliminada exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar el detalle de carga:', error);
        this.snackBar.open('Error al eliminar el detalle de carga', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarDetalleCargaHoraria(detallecargahoraria: Datum) {
    this.router.navigateByUrl(`dashboard/editar-detalle-carga/${detallecargahoraria.id}`);
  }

}
