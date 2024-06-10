import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Observable } from 'rxjs';
import { GetCarreraResponse } from '../interfaces/carrera.interface';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private endpoint = 'carrera'; // Define el endpoint para la entidad Materia

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetCarreraResponse> {
    return this.apiService.get<GetCarreraResponse>(`${this.endpoint}`);
  }

  // getById(id: number): Observable<any> {
  //   return this.apiService.get<any>(`${this.endpoint}/${id}`);
  // }

  // create(asistencia: PostAsistenciaParams): Observable<any> {
  //   return this.apiService.post<any, PostAsistenciaParams>(this.endpoint, asistencia);
  // }

  // update(id: number, asistencia: any): Observable<any> {
  //   return this.apiService.put<any, any>(`${this.endpoint}/${id}`, asistencia);
  // }

  // delete(id: number): Observable<any> {
  //   return this.apiService.delete<any>(`${this.endpoint}/${id}`);
  // }
}
