export interface PostModalidadParams {
    nombre: string;
    descripcion: string;
}

export interface GetModalidadReponse {
    statusCode: number;
    message:    string;
    data:       Datum[];
}

export interface Datum {
    id:          number;
    nombre:      string;
    descripcion: string;
}

export interface GetModalidadByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:          number;
    nombre:      string;
    descripcion: string;
}
