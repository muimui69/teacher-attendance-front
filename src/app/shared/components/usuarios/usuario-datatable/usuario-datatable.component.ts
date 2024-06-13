import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Datum } from '@interfaces/carrera.interface';
import { MaterialModule } from '@shared/components/material/material.module';
import { IconService } from '@shared/services/icon.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '@services/usuario.service';
import { UsuarioDatableDataSource } from './usuario-datatable-datasource';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario-datatable',
  templateUrl: './usuario-datatable.component.html',
  styleUrl: './usuario-datatable.component.css',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule, MatSortModule, MaterialModule, LucideAngularModule]
})
export class UsuarioDatatableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Datum>;
  dataSource = new UsuarioDatableDataSource();
  dataSubscription!: Subscription;

  displayedColumns = ['nombre', 'apellido', 'email', 'acciones'];


  constructor(
    private usuarioService: UsuarioService,
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
    this.usuarioService.getAll().subscribe(data => {
      this.dataSource.data = data.data;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarUsuario(usuario: Datum): void {
    // const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta carrera?');
    // if (confirmacion) {
    this.usuarioService.delete(usuario.id).subscribe(
      () => {
        this.snackBar.open('Usuario eliminado exitosamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.error('Error al eliminar al usuario:', error);
        this.snackBar.open('Error al eliminar al usuario', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
    // }
  }

  navigateEditarUsuario(carrera: Datum) {
    this.router.navigateByUrl(`dashboard/editar-usuario/${carrera.id}`);
  }

}
