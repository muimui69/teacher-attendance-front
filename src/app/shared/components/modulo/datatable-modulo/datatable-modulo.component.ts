import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ModuloDatatableDataSource } from './datatable-modulo-datasource';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuloService } from '@services/modulo.service';
import { Datum } from '@interfaces/modulo.interface';


@Component({
  selector: 'app-modulo-datatable',
  templateUrl: './datatable-modulo.component.html',
  styleUrl: './datatable-modulo.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class ModuloDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new ModuloDatatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['numero','ubicacion', 'acciones'];


  constructor(
    private moduloService: ModuloService,
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
    this.moduloService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarModulo(modulo: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.moduloService.delete(modulo.id).subscribe(
      () => {
        this.snackBar.open('¡Carrera eliminada exitosamente!', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right', 
          verticalPosition: 'bottom', 
        });
      },
      (error) => {
        console.error('Error al eliminar la carrera:', error);
        this.snackBar.open('Error al crear la carrera', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarModulo(modulo: Datum) {
    this.router.navigateByUrl(`dashboard/editar-modulo/${modulo.id}`);
  }

}
