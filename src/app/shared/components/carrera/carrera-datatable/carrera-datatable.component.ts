import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CarreraDatableDataSource } from './carrera-datatable-datasource';
import { CarreraService } from '@services/carrera.service';
import { Datum } from '@interfaces/carrera.interface';

@Component({
  selector: 'app-carrera-datatable',
  templateUrl: './carrera-datatable.component.html',
  styleUrl: './carrera-datatable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class CarreraDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new CarreraDatableDataSource();

  displayedColumns = ['nombre'];

  constructor(private carreraService: CarreraService) { }

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
}
