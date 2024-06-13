export interface PostGrupoParams {
  nombre: string;
}

export interface GetGrupoResponse {
    statusCode: number;
    message:    string;
    data:       DatumG[];
}

export interface DatumG {
    id:     number;
    nombre: string;
}

export interface GetGrupoByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:     number;
    nombre: string;
}

