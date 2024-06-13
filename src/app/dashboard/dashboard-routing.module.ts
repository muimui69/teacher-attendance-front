import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './dashboard.component';
import DocenteComponent from './pages/docente/docente.component';
import AsignarMateriaDocenteComponent from './pages/docente/asignar-materia-docente/asignar-materia-docente.component';
import MateriaComponent from './pages/materia/materia.component';
import CarreraComponent from './pages/carrera/carrera.component';
import ModalidadComponent from './pages/modalidad/modalidad.component';
import AulaComponent from './pages/aula/aula.component';
import PeriodoComponent from './pages/periodo/periodo.component';
import ModuloComponent from './pages/modulo/modulo.component';
import licenciaDocenteComponent from './pages/docente/licencia-docente/licencia-docente.component';
import AsignarHorarioDocenteComponent from './pages/docente/asignar-horario-docente/asignar-horario-docente.component';

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
                title: 'Usuarios',
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
                        title: 'Carga horaria',
                        component: AsignarMateriaDocenteComponent,
                    },
                    {
                      path: 'asignar-detalle-carga-docente',
                      title: 'Detalle carga horaria',
                      component: AsignarHorarioDocenteComponent,
                    },
                    {
                      path: 'licencia-docente',
                      title: 'Solicitar licencia',
                      component: licenciaDocenteComponent,
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
                component: CarreraComponent,
                data: {
                    icon: 'subject',
                },
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
                path: 'periodo',
                title: 'Periodos',
                component: PeriodoComponent,
                data: {
                    icon: 'calendar'
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
                component: ModuloComponent,
                title: 'Modulos',
                data: {
                    icon: 'university'
                }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export default class DashboardRoutingModule { }
