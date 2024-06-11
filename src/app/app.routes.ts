import { Routes } from '@angular/router';
import { CreateCarreraFormComponent } from '@shared/components/carrera/create-carrera-form/create-carrera-form.component';
import { EditCarreraFormComponent } from '@shared/components/carrera/edit-carrera-form/edit-carrera-form.component';
import { CreateModuloFormComponent } from '@shared/components/modulo/create-modulo-form/create-modulo-form.component';
import { EditModuloFormComponent } from '@shared/components/modulo/edit-modulo-form/edit-modulo-form.component';

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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
