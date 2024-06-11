export interface PostPeriodoParams {
    nombre:string;
    gestion:number;
    fecha_inicio:Date;
    fecha_fin:Date;
}


export interface GetPeriodoResponse {
    statusCode: number;
    message:    string;
    data:       Datum[];
}

export interface Datum {
    id:           number;
    fecha_inicio: Date;
    fecha_fin:    Date;
    gestion:      number;
    nombre:       string;
}

export interface GetPeriodoByID {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    id:           number;
    fecha_inicio: Date;
    fecha_fin:    Date;
    gestion:      number;
    nombre:       string;
}
