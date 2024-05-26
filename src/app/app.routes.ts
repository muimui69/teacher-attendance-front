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
                data: {
                    icon: 'user'
                },
                children: [
                    {
                        path: 'asignar-materia',
                        title: 'Asignar Materia Docente',
                        loadComponent: () => import("./dashboard/pages/docente/asignar-materia/asignar-materia.component"),
                        data: {
                            icon: 'user'
                        }
                    }
                ]
            },
            {
                path: 'materia',
                title: 'Materias',
                loadComponent: () => import('./dashboard/pages/materia/materia.component'),
                data: {
                    icon: 'book'
                }
            },
            {
                path: 'carrera',
                title: 'Carreras',
                loadComponent: () => import('./dashboard/pages/carrera/carrera.component'),
                data: {
                    icon: 'subject'
                },
                 children: [
                    {
                        path: 'asignar-materia',
                        title: 'Asignar Materia a Carrera',
                        loadComponent: () => import("./dashboard/pages/carrera/asignar-materia/asignar-materia.component"),
                        data: {
                            icon: 'user'
                        }
                    }
                ]
            },
            {
                path: 'modalidad',
                title: 'Modalidades',
                loadComponent: () => import('./dashboard/pages/modalidad/modalidad.component'),
                data: {
                    icon: 'graduation'
                }
            },
            {
                path: 'aula',
                title: 'Aulas',
                loadComponent: () => import('./dashboard/pages/aula/aula.component'),
                data: {
                    icon: 'door'
                }
            },
            {
                path: 'modulo',
                title: 'Modulos',
                loadComponent: () => import('./dashboard/pages/modulo/modulo.component'),
                data: {
                    icon: 'university'
                }
            },
            {
                path: 'reporte',
                title: 'Reportes',
                loadComponent: () => import('./dashboard/pages/reporte/reporte.component'),
                data: {
                    icon: 'file'
                },
            },
        ]
    }, {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
