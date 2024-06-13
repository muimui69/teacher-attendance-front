import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api/api.service';
import { GetLicenciaByID, GetLicenciaResponse, PostLicenciaParams } from '@interfaces/licencia.interface';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  private endpoint = 'licencia'; // Define el endpoint para la entidad Materia
  private _data = new BehaviorSubject<GetLicenciaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetLicenciaResponse> {
    return this.apiService.get<GetLicenciaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetLicenciaByID> {
    return this.apiService.get<GetLicenciaByID>(`${this.endpoint}/${id}`);
  }

  create(licencia: PostLicenciaParams): Observable<any> {
    return this.apiService.post<any, PostLicenciaParams>(this.endpoint, licencia).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, licencia: PostLicenciaParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, licencia);
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
