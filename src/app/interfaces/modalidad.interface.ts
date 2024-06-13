export interface PostModalidadParams {
    nombre: string;
    descripcion: string;
}

export interface GetModalidadReponse {
    statusCode: number;
    message:    string;
    data:       DatumMo[];
}

export interface DatumMo {
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
