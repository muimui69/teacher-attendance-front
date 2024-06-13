export interface PostLicenciaParams {
    titulo: string;
    descripcion: string;
    fecha: Date;
}

export interface GetLicenciaResponse {
  statusCode: number;
  message:    string;
  data:       Datum[];
}

export interface Datum {
  id:      number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  docente: Usuario;
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
  id:      number;
  nombre:  string;
}

export interface GetLicenciaByID {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
  id:      number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  docente: Usuario;
}


