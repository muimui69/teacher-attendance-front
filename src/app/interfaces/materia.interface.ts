export interface PostMateriaParams {
    nombre: string;
    sigla: string;
    carreraId : number;
}

export interface GetMateriaResponse {
    statusCode: number;
    message:    string;
    data:       DatumM[];
}

export interface DatumM {
    id:      number;
    nombre:  string;
    sigla:   string;
    carrera: Carrera;
}

export interface Carrera {
    id:     number;
    nombre: string;
}

export interface GetMateriaByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:      number;
    nombre:  string;
    sigla:   string;
    carrera: Carrera;
}

export interface Carrera {
    id:     number;
    nombre: string;
}

