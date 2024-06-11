import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetModalidadByID, GetModalidadReponse, PostModalidadParams } from '@interfaces/modalidad.interface';

@Injectable({
  providedIn: 'root'
})

export class ModalidadService {

  private endpoint = 'modalidad'; 
  private _data = new BehaviorSubject<GetModalidadReponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {} 

  getAll(): Observable<GetModalidadReponse> {
    return this.apiService.get<GetModalidadReponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetModalidadByID> {
    return this.apiService.get<GetModalidadByID>(`${this.endpoint}/${id}`);
  }

  create(modalidad: PostModalidadParams): Observable<any> {
    return this.apiService.post<any, PostModalidadParams>(this.endpoint, modalidad).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, modalidad: PostModalidadParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, modalidad);
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
