export interface PostAulaParams {
    nombre: string;
    moduloId: number;
}

export interface GetAulaResponse {
    statusCode: number;
    message:    string;
    data:       Datum[];
}

export interface Datum {
    id:     number;
    nombre: number;
    modulo: Modulo;
}

export interface Modulo {
    id:        number;
    ubicacion: string;
    numero:    number;
}


export interface GetAulaByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:     number;
    nombre: number;
    modulo: Modulo;
}

export interface Modulo {
    id:        number;
    ubicacion: string;
    numero:    number;
}

