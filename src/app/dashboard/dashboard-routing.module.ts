import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './dashboard.component';
import DocenteComponent from './pages/docente/docente.component';
import AsignarMateriaDocenteComponent from './pages/docente/asignar-materia-docente/asignar-materia-docente.component';
import MateriaComponent from './pages/materia/materia.component';
import AsignarMateriaCarreraComponent from './pages/carrera/asignar-materia/asignar-materia-carrera.component';
import CarreraComponent from './pages/carrera/carrera.component';
import ModalidadComponent from './pages/modalidad/modalidad.component';
import AulaComponent from './pages/aula/aula.component';
import ModuloComponent from './pages/modulo/modulo.component';
import AsignarAulaComponent from './pages/modulo/asignar-aula/asignar-aula.component';
import { CreateDocenteComponent } from '@shared/components/docente/create-docente/create-docente.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'docente',
                pathMatch: 'full'
            },
            {
                path: 'docente',
                title: 'Docentes',
                data: {
                    icon: 'user',
                },
                children: [
                    {
                        path: '',
                        component: DocenteComponent,
                    },
                    {
                        path: 'asignar-materia-docente',
                        title: 'Asignar Materia',
                        component: AsignarMateriaDocenteComponent,
                    },
                    {
                        path: 'create',
                        title: 'Crear docente',
                        component: CreateDocenteComponent,
                    },

                ]
            },
            {
                path: 'materia',
                title: 'Materias',
                component: MateriaComponent,
                data: {
                    icon: 'book',
                }
            },
            {
                path: 'carrera',
                title: 'Carreras',
                data: {
                    icon: 'subject',
                },
                children: [
                    {
                        path: '',
                        component: CarreraComponent,
                    },
                    {
                        path: 'asignar-materia-carrera',
                        title: 'Asignar Materia',
                        component: AsignarMateriaCarreraComponent,
                    }
                ]
            },
            {
                path: 'modalidad',
                title: 'Modalidades',
                component: ModalidadComponent,
                data: {
                    icon: 'graduation'
                }
            },
            {
                path: 'aula',
                title: 'Aulas',
                component: AulaComponent,
                data: {
                    icon: 'door'
                }
            },
            {
                path: 'modulo',
                title: 'Modulos',
                data: {
                    icon: 'university'
                },
                children: [
                    {
                        path: '',
                        component: ModuloComponent,
                    },
                    {
                        path: 'asignar-aula',
                        title: 'Asignar Aula',
                        component: AsignarAulaComponent,
                    }
                ]
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export default class DashboardRoutingModule { }
