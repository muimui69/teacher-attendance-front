export interface PostAsistenciaParams {
    estado: number;
    entrada: Date;
    salida: Date;
    toleranciaMinutos: Date;
    id_docente?: number;
}