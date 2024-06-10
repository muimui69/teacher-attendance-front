import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CarreraDatableDataSource } from './carrera-datatable-datasource';
import { CarreraService } from '@services/carrera.service';
import { Datum } from '@interfaces/carrera.interface';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrera-datatable',
  templateUrl: './carrera-datatable.component.html',
  styleUrl: './carrera-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class CarreraDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new CarreraDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre', 'acciones'];


  constructor(
    private carreraService: CarreraService,
    private iconService: IconService,
    private router: Router
  ) {
  }

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }


  ngOnInit(): void {
    this.carreraService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarCarrera(carrera: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.carreraService.delete(carrera.id).subscribe();
    // }
  }

  navigateEditarCarrera(carrera: Datum) {
    this.router.navigateByUrl(`dashboard/editar-carrera/${carrera.id}`);
  }

}
