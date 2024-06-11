import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetAulaByID, GetAulaResponse, PostAulaParams } from '@interfaces/aula.interface';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private endpoint = 'aula'; // Define el endpoint para la entidad Materia
  private _data = new BehaviorSubject<GetAulaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetAulaResponse> {
    return this.apiService.get<GetAulaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetAulaByID> {
    return this.apiService.get<GetAulaByID>(`${this.endpoint}/${id}`);
  }

  create(aula: PostAulaParams): Observable<any> {
    return this.apiService.post<any, PostAulaParams>(this.endpoint, aula).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, aula: PostAulaParams): Observable<any> {
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
