import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:()=> import('./auth/login/login.component'),
    },
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

            },
            {
                path: 'docente/asignar-materia-docente',
                title: 'Asignar Materia',
                loadComponent: () => import("./dashboard/pages/docente/asignar-materia-docente/asignar-materia-docente.component"),
                data: {
                    icon: 'circlePlus'
                },
            },
            {
                path: 'docente/asignar-horario-docente',
                title: 'Asignar Horario',
                loadComponent: () => import("./dashboard/pages/docente/asignar-horario-docente/asignar-horario-docente.component"),
                data: {
                    icon: 'circlePlus'
                },
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
            },
            {
                path: 'carrera/asignar-materia',
                title: 'Asignar Materia',
                loadComponent: () => import("./dashboard/pages/carrera/asignar-materia/asignar-materia-carrera.component"),
                data: {
                    icon: 'circlePlus'
                }
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
                path: 'modulo/asignar-aula',
                title: 'Asignar Aula',
                loadComponent: () => import('./dashboard/pages/modulo/asignar-aula/asignar-aula.component'),
                data: {
                    icon: 'circlePlus'
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
    }, 
];
