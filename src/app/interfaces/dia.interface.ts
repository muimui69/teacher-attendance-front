export interface GetDiaResponse {
    statusCode: number;
    message:    string;
    data:       DatumD[];
}

export interface DatumD {
    id:     number;
    nombre: string;
}

export interface GetDiaByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:     number;
    nombre: string;
}

