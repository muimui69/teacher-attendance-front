import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetModuloByID, GetModuloParams, PostMduloParams } from '../interfaces/modulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private endpoint = 'modulo'; 
  private _data = new BehaviorSubject<GetModuloParams | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetModuloParams> {
    return this.apiService.get<GetModuloParams>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetModuloByID> {
    return this.apiService.get<GetModuloByID>(`${this.endpoint}/${id}`);
  }

  create(modulo: PostMduloParams): Observable<any> {
    return this.apiService.post<any, PostMduloParams>(this.endpoint, modulo).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, modulo: PostMduloParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, modulo);
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
