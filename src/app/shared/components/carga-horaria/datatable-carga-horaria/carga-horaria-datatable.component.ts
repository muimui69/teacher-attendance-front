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
import { CargaHorariaDatableDataSource } from './carga-horaria-datatable-datasource';
import { CargaHorariaService } from '@services/cargahoraria.service';
import { Datum } from '@interfaces/carga-horaria.interface';


@Component({
  selector: 'app-carga-horaria-datatable',
  templateUrl: './carga-horaria-datatable.component.html',
  styleUrl: './carga-horaria-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class CargaHorariaDatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new CargaHorariaDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['docente','materia','modalidad', 'periodo', 'acciones'];


  constructor(
    private cargahorariaService: CargaHorariaService,
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
    this.cargahorariaService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
      console.log(data)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarCargaHoraria(cargahoraria: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.cargahorariaService.delete(cargahoraria.id).subscribe(
      () => {
        this.snackBar.open('Carga horaria eliminada exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar la carga horaria:', error);
        this.snackBar.open('Error al eliminar la carga horaria', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarCargaHoraria(cargahoraria: Datum) {
    this.router.navigateByUrl(`dashboard/editar-carga-horaria/${cargahoraria.id}`);
  }

}
