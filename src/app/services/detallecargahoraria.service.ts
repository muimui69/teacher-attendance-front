import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GetDetalleCargaHorariaByID, GetDetalleCargaHorariaResponse, PostDetalleCargaHorariaParams } from '@interfaces/detalle-carga-horaria.interface';

@Injectable({
  providedIn: 'root',
})
export class DetalleCargaHorariaService {

  private endpoint = 'detalle-carga-horaria';
  private _data = new BehaviorSubject<GetDetalleCargaHorariaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetDetalleCargaHorariaResponse> {
    return this.apiService.get<GetDetalleCargaHorariaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetDetalleCargaHorariaByID> {
    return this.apiService.get<GetDetalleCargaHorariaByID>(`${this.endpoint}/${id}`);
  }

  create(detallecargahoraria: PostDetalleCargaHorariaParams): Observable<any> {
    return this.apiService.post<any, PostDetalleCargaHorariaParams>(this.endpoint, detallecargahoraria).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, detallecargahoraria: PostDetalleCargaHorariaParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, detallecargahoraria);
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
