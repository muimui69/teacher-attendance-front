import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: '',
                redirectTo: 'docente',
                pathMatch: 'full'
            },
            {
                path: 'docente',
                title: 'Docentes',
                loadComponent: () => import('./dashboard/pages/docente/docente.component'),
                data:{
                    icon:'user'
                }
            },
            {
                path: 'materia',
                title: 'Materias',
                loadComponent: () => import('./dashboard/pages/materia/materia.component'),
                data:{
                    icon:'book'
                }
            },
            {
                path: 'carrera',
                title: 'Carreras',
                loadComponent: () => import('./dashboard/pages/carrera/carrera.component'),
                data:{
                    icon:'subject'
                }
            },
        ]
    }, {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
