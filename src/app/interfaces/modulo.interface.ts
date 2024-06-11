export interface PostMduloParams{
    numero:number;
    ubicacion:string;
}

export interface GetModuloParams {
    statusCode: number;
    message:    string;
    data:       Datum[];
}

export interface Datum {
    id:        number;
    ubicacion: string;
    numero:    number;
}


export interface GetModuloByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:        number;
    ubicacion: string;
    numero:    number;
}


