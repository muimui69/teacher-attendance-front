import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetCargaHorariaByID, GetCargaHorariaResponse, PostCargaHoriaParames } from '@interfaces/carga-horaria.interface';

@Injectable({
  providedIn: 'root',
})
export class CargaHorariaService {

  private endpoint = 'carga-horaria';
  private _data = new BehaviorSubject<GetCargaHorariaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetCargaHorariaResponse> {
    return this.apiService.get<GetCargaHorariaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetCargaHorariaByID> {
    return this.apiService.get<GetCargaHorariaByID>(`${this.endpoint}/${id}`);
  }

  create(cargahoraria: PostCargaHoriaParames): Observable<any> {
    return this.apiService.post<any, PostCargaHoriaParames>(this.endpoint, cargahoraria).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, cargahoraria: PostCargaHoriaParames): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, cargahoraria);
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
