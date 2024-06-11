import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetMateriaByID, GetMateriaResponse, PostMateriaParams } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {

  private endpoint = 'materia'; 
  private _data = new BehaviorSubject<GetMateriaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetMateriaResponse> {
    return this.apiService.get<GetMateriaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetMateriaByID> {
    return this.apiService.get<GetMateriaByID>(`${this.endpoint}/${id}`);
  }

  create(materia: PostMateriaParams): Observable<any> {
    return this.apiService.post<any, PostMateriaParams>(this.endpoint, materia).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, materia: PostMateriaParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, materia);
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
