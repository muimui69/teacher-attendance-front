export interface PostCarreraParams {
    nombre: string;
}

export interface GetCarreraResponse {
    statusCode: number;
    message:    string;
    data:       Datum[];
}

export interface Datum {
    id:     number;
    nombre: string;
}
