import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetGrupoByID, GetGrupoResponse, PostGrupoParams } from '@interfaces/grupo.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private endpoint = 'grupo'; // Define el endpoint para la entidad Materia
  private _data = new BehaviorSubject<GetGrupoResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetGrupoResponse> {
    return this.apiService.get<GetGrupoResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetGrupoByID> {
    return this.apiService.get<GetGrupoByID>(`${this.endpoint}/${id}`);
  }

  create(aula: PostGrupoParams): Observable<any> {
    return this.apiService.post<any, PostGrupoParams>(this.endpoint, aula).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, aula: PostGrupoParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, aula);
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
