export interface PostUsuarioParams {
  nombre: string;
  apellido: string;
  email : string;
  password : string;
}

export interface GetUsuarioResponse {
  statusCode: number;
  message:    string;
  data:       DatumU[];
}

export interface DatumU {
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

export interface GetUsuarioByID {
  statusCode: number;
  message:    string;
  data:       Data;
}

export interface Data {
  id:      number;
  nombre:  string;
  apellido:   string;
  email:   string;
  password: string;
  roles: Roles[];
}


