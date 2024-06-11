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
import { AulaDatableDataSource } from './aula-datatable-datasource';
import { Datum } from '@interfaces/aula.interface';
import { AulaService } from '@services/aula.service';


@Component({
  selector: 'app-aula-datatable',
  templateUrl: './aula-datatable.component.html',
  styleUrl: './aula-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class AulaDatatableComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new AulaDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre','numero','ubicacion', 'acciones'];


  constructor(
    private aulaService: AulaService,
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
    this.aulaService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
      console.log(data)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarAula(aula: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.aulaService.delete(aula.id).subscribe(
      () => {
        this.snackBar.open('Aula eliminada exitosamente!', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right', 
          verticalPosition: 'bottom', 
        });
      },
      (error) => {
        console.error('Error al eliminar el Aula:', error);
        this.snackBar.open('Error al eliminar el Aula', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarAula(aula: Datum) {
    this.router.navigateByUrl(`dashboard/editar-aula/${aula.id}`);
  }

}
