import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Datum } from '@interfaces/licencia.interface';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LicenciaDatableDataSource } from './licencia-datatable-datasource';
import { LicenciaService } from '@services/licencia.service';


@Component({
  selector: 'app-licencia-datatable',
  templateUrl: './licencia-datatable.component.html',
  styleUrl: './licencia-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class LicenciaDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new LicenciaDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['titulo', 'fecha', 'descripcion','nombre_c' ];

  constructor(
    private licenciaService: LicenciaService,
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
    this.licenciaService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarLicencia(licencia: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.licenciaService.delete(licencia.id).subscribe(
      () => {
        this.snackBar.open('Licencia eliminado exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar la licencia:', error);
        this.snackBar.open('Error al crear la licencia', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarLicencia(licencia: Datum) {
    this.router.navigateByUrl(`dashboard/docente/editar-licencia/${licencia.id}`);
  }

}
