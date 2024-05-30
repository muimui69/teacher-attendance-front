import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Observable } from 'rxjs';
import { PostMateriaParams } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {

  private endpoint = 'materia'; // Define el endpoint para la entidad Materia

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}`);
  }

  getById(id: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/${id}`);
  }

  create(materia: PostMateriaParams): Observable<any> {
    return this.apiService.post<any, PostMateriaParams>(this.endpoint, materia);
  }

  update(id: number, materia: any): Observable<any> {
    return this.apiService.put<any, any>(`${this.endpoint}/${id}`, materia);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${id}`);
  }
}
