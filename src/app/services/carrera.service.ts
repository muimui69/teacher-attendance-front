import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetCarreraByID, GetCarreraResponse, PostCarreraParams } from '../interfaces/carrera.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private endpoint = 'carrera'; // Define el endpoint para la entidad Materia
  private _data = new BehaviorSubject<GetCarreraResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetCarreraResponse> {
    return this.apiService.get<GetCarreraResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetCarreraByID> {
    return this.apiService.get<GetCarreraByID>(`${this.endpoint}/${id}`);
  }

  create(carrera: PostCarreraParams): Observable<any> {
    return this.apiService.post<any, PostCarreraParams>(this.endpoint, carrera).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, carrera: PostCarreraParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, carrera);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<any>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.refreshData())
    );
  }
  
  private refreshData(): void {
    this.getAll().subscribe();
  }
}
