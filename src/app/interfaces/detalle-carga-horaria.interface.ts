export interface PostDetalleCargaHorariaParams {
  hora_inicio: string;
  hora_fin: string;
  aulaId: number;
  cargaHorariaId: number;
  diaId: number;
  grupoId: number;
}

export interface GetDetalleCargaHorariaResponse {
  statusCode: number;
  message: string;
  data: Datum[];
}

export interface GetDetalleCargaHorariaByID {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  cargaHoraria: CargaHoraria;
  grupo: Grupo;
  aula: Aula;
  dias: Dias;
  hora_inicio: string;
  hora_fin: string;
}

export interface Datum {
  id: number;
  cargaHoraria: CargaHoraria;
  grupo: Grupo;
  aula: Aula;
  dias: Dias;
  hora_inicio: string;
  hora_fin: string;
}

export interface Aula {
  id: number;
  nombre: number;
  modulo: Modulo;
}

export interface Modulo {
  id: number;
  ubicacion: string;
  numero: number;
}

export interface Dias {
  id: number;
  nombre: string;
}

export interface Grupo {
  id: number;
  nombre: string;
}

export interface CargaHoraria {
  id: number;
  docente: Usuario;
  materia: Materia;
  periodo: Periodo;
  modalidad: Modalidad;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  roles: Roles[];
}

export interface Roles {
  id: number;
  nombre: string;
}

export interface Periodo {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  gestion: number;
  nombre: string;
}

export interface Materia {
  id: number;
  nombre: string;
  sigla: string;
  carrera: Carrera;
}

export interface Carrera {
  id: number;
  nombre: string;
}

export interface Modalidad {
  id: number;
  nombre: string;
  descripcion: string;
}

