import { Routes } from '@angular/router';
import { CreateAulaFormComponent } from '@shared/components/aula/create-aula-form/create-aula-form.component';
import { EditAulaFormComponent } from '@shared/components/aula/edit-aula-form/edit-aula-form.component';
import { CreateCarreraFormComponent } from '@shared/components/carrera/create-carrera-form/create-carrera-form.component';
import { EditCarreraFormComponent } from '@shared/components/carrera/edit-carrera-form/edit-carrera-form.component';
import { CreateLicenciaFormComponent } from '@shared/components/licencia/create-licencia-form/create-licencia-form.component';
import { CreateMateriaFormComponent } from '@shared/components/materia/create-materia-form/create-materia-form.component';
import { EditMateriaFormComponent } from '@shared/components/materia/edit-materia-form/edit-materia-form.component';
import { CreateModalidadFormComponent } from '@shared/components/modalidad/create-modalidad-form/create-modalidad-form.component';
import { EditModalidadFormComponent } from '@shared/components/modalidad/edit-modalidad-form/edit-modalidad-form.component';
import { CreateModuloFormComponent } from '@shared/components/modulo/create-modulo-form/create-modulo-form.component';
import { EditModuloFormComponent } from '@shared/components/modulo/edit-modulo-form/edit-modulo-form.component';
import { CreatePeriodoFormComponent } from '@shared/components/periodo/create-periodo-form/create-periodo-form.component';
import { EditPeriodoFormComponent } from '@shared/components/periodo/edit-periodo-form/edit-periodo-form.component';
import { CreateUsuarioFormComponent } from '@shared/components/usuarios/create-usuario-form/create-usuario-form.component';
import { EditUsuarioComponent } from '@shared/components/usuarios/edit-usuario-form/edit-usuario-form.component';
import { EditLicenciaFormComponent } from '@shared/components/licencia/edit-licencia-form/edit-licencia-form.component';
import { CreateCargaHorariaFormComponent } from '@shared/components/carga-horaria/create-carga-horaria-form/create-carga-horaria-form.component';
import { EditCargaHorariaFormComponent } from '@shared/components/carga-horaria/edit-carga-horaria-form/edit-carga-horaria-form.component';
import { EditDetalleCargaHorariaFormComponent } from '@shared/components/detalle-carga-horaria/edit-detalle-carga-horaria-form/edit-detalle-carga-form.component';
import { CreateDetalleCargaHorariaFormComponent } from '@shared/components/detalle-carga-horaria/create-detalle-carga-horaria-form/create-detalle-carga-form.component';


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./auth/login/login.component'),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-routing.module')
    },
    {
        path: 'dashboard/crear-carrera',
        title: 'Crear carrera',
        component: CreateCarreraFormComponent,
    },
    {
        path: 'dashboard/editar-carrera/:id',
        title: 'Editar carrera',
        component: EditCarreraFormComponent,
    },
    {
        path: 'dashboard/crear-modulo',
        title: 'Crear modulo',
        component: CreateModuloFormComponent,
    },
    {
        path: 'dashboard/editar-modulo/:id',
        title: 'Editar carrera',
        component: EditModuloFormComponent,
    },
    {
        path: 'dashboard/crear-modalidad',
        title: 'Crear modalidad',
        component: CreateModalidadFormComponent,
    },
    {
        path: 'dashboard/editar-modalidad/:id',
        title: 'Editar modalidad',
        component: EditModalidadFormComponent,
    },
    {
        path: 'dashboard/crear-periodo',
        title: 'Crear periodo',
        component: CreatePeriodoFormComponent,
    },
    {
        path: 'dashboard/editar-periodo/:id',
        title: 'Editar periodo',
        component: EditPeriodoFormComponent,
    },
    {
        path: 'dashboard/crear-aula',
        title: 'Crear aula',
        component: CreateAulaFormComponent,
    },
    {
        path: 'dashboard/editar-aula/:id',
        title: 'Editar aula',
        component: EditAulaFormComponent,
    },
    {
        path: 'dashboard/crear-materia',
        title: 'Crear materia',
        component: CreateMateriaFormComponent,
    },
    {
        path: 'dashboard/editar-materia/:id',
        title: 'Editar materia',
        component: EditMateriaFormComponent,
    },
    {
      path: 'dashboard/crear-usuario',
      title: 'Crea usuario',
      component: CreateUsuarioFormComponent,
    },
    {
      path: 'dashboard/editar-usuario/:id',
      title: 'Editar usuario',
      component: EditUsuarioComponent,
    },
    {
      path: 'dashboard/docente/crear-licencia',
      title: 'Crea licencia',
      component: CreateLicenciaFormComponent,
    },
    {
      path: 'dashboard/docente/editar-licencia/:id',
      title: 'Editar licencia',
      component: EditLicenciaFormComponent,
    },
    {
      path: 'dashboard/crear-carga-horaria',
      title: 'Crea carga horaria',
      component: CreateCargaHorariaFormComponent,
    },
    {
      path: 'dashboard/editar-carga-horaria/:id',
      title: 'Editar carga horaria',
      component: EditCargaHorariaFormComponent,
    },
    {
      path: 'dashboard/crear-detalle-carga',
      title: 'Crea carga horaria',
      component: CreateDetalleCargaHorariaFormComponent,
    },
    {
      path: 'dashboard/editar-detalle-carga/:id',
      title: 'Editar carga horaria',
      component: EditDetalleCargaHorariaFormComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
