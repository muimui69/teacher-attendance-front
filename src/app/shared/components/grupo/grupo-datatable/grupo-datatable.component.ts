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
import { DatumG } from '@interfaces/grupo.interface';
import { GrupoDatableDataSource } from './grupo-datatable-datasource';
import { GrupoService } from '@services/grupo.service';


@Component({
  selector: 'app-grupo-datatable',
  templateUrl: './grupo-datatable.component.html',
  styleUrl: './grupo-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})

export class GrupoDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DatumG>;
  dataSource = new GrupoDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre', 'acciones'];

  constructor(
    private grupoService: GrupoService,
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
    this.grupoService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarGrupo(grupo: DatumG): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.grupoService.delete(grupo.id).subscribe(
      () => {
        this.snackBar.open('Grupo eliminado exitosamente!', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right', 
          verticalPosition: 'bottom', 
        });
      },
      (error) => {
        console.error('Error al eliminar la Grupo:', error);
        this.snackBar.open('Error al crear la Grupo', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarGrupo(grupo: DatumG) {
    this.router.navigateByUrl(`dashboard/editar-grupo/${grupo.id}`);
  }

}
