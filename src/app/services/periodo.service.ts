import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetPeriodoByID, GetPeriodoResponse, PostPeriodoParams } from '@interfaces/periodo.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private endpoint = 'periodo'; 

  private _data = new BehaviorSubject<GetPeriodoResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetPeriodoResponse> {
    return this.apiService.get<GetPeriodoResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetPeriodoByID> {
    return this.apiService.get<GetPeriodoByID>(`${this.endpoint}/${id}`);
  }

  create(periodo: PostPeriodoParams): Observable<any> {
    return this.apiService.post<any, PostPeriodoParams>(this.endpoint, periodo).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, periodo: PostPeriodoParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, periodo);
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
