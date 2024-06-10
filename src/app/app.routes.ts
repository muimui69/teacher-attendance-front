import { Routes } from '@angular/router';
import { CreateCarreraFormComponent } from '@shared/components/carrera/create-carrera-form/create-carrera-form.component';
import { CreateDocenteComponent } from '@shared/components/docente/create-docente/create-docente.component';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent:()=> import('./auth/login/login.component'),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-routing.module')
    },
    // {
    //     path: 'dashboard/crear-docente',
    //     title: 'Crear docente',
    //     component: CreateDocenteComponent,
    // },
    // {
    //     path: 'dashboard/crear-carrera',
    //     title: 'Crear docente',
    //     component: CreateCarreraFormComponent,
    // },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
