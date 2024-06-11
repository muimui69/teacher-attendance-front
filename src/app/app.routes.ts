import { Routes } from '@angular/router';
import { CreateAulaFormComponent } from '@shared/components/aula/create-aula-form/create-aula-form.component';
import { EditAulaFormComponent } from '@shared/components/aula/edit-aula-form/edit-aula-form.component';
import { CreateCarreraFormComponent } from '@shared/components/carrera/create-carrera-form/create-carrera-form.component';
import { EditCarreraFormComponent } from '@shared/components/carrera/edit-carrera-form/edit-carrera-form.component';
import { CreateMateriaFormComponent } from '@shared/components/materia/create-materia-form/create-materia-form.component';
import { EditMateriaFormComponent } from '@shared/components/materia/edit-materia-form/edit-materia-form.component';
import { CreateModalidadFormComponent } from '@shared/components/modalidad/create-modalidad-form/create-modalidad-form.component';
import { EditModalidadFormComponent } from '@shared/components/modalidad/edit-modalidad-form/edit-modalidad-form.component';
import { CreateModuloFormComponent } from '@shared/components/modulo/create-modulo-form/create-modulo-form.component';
import { EditModuloFormComponent } from '@shared/components/modulo/edit-modulo-form/edit-modulo-form.component';
import { CreatePeriodoFormComponent } from '@shared/components/periodo/create-periodo-form/create-periodo-form.component';
import { EditPeriodoFormComponent } from '@shared/components/periodo/edit-periodo-form/edit-periodo-form.component';

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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
