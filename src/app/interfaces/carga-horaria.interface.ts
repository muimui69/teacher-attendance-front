export interface PostCargaHoriaParames {
    id_docente: number;
    id_materia: number;
    id_modalidad: number;
    id_periodo: number;
}

export interface GetCargaHorariaResponse {
  statusCode: number;
  message:    string;
  data:       Datum[];
}

export interface GetCargaHorariaByID {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Datum {
  id:      number;
  docente: Usuario;
  materia:  Materia;
  periodo:   Periodo;
  modalidad: Modalidad;
}

export interface Usuario {
  id:      number;
  nombre:  string;
  apellido:   string;
  email:   string;
  password: string;
  roles: Roles[];
}

export interface Roles {
  id:     number;
  nombre: string;
}

export interface Periodo {
  id:           number;
  fecha_inicio: Date;
  fecha_fin:    Date;
  gestion:      number;
  nombre:       string;
}

export interface Materia {
  id:      number;
  nombre:  string;
  sigla:   string;
  carrera: Carrera;
}

export interface Carrera {
  id:     number;
  nombre: string;
}

export interface Modalidad {
  id:          number;
  nombre:      string;
  descripcion: string;
}

export interface Data {
  id:      number;
  docente: Usuario;
  materia:  Materia;
  periodo:   Periodo;
  modalidad: Modalidad;
}

