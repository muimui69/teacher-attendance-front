import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'docente',
                title: 'Docentes',
                loadComponent: () => import('./dashboard/pages/docente/docente.component')
            },
            {
                path: 'materia',
                title: 'Materias',
                loadComponent: () => import('./dashboard/pages/materia/materia.component')
            },
            {
                path: 'carrera',
                title: 'Carreras',
                loadComponent: () => import('./dashboard/pages/carrera/carrera.component')
            },
        ]
    }, {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
