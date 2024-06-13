import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetDiaByID, GetDiaResponse } from '@interfaces/dia.interface';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  private endpoint = 'dias';
  private _data = new BehaviorSubject<GetDiaResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetDiaResponse> {
    return this.apiService.get<GetDiaResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetDiaByID> {
    return this.apiService.get<GetDiaByID>(`${this.endpoint}/${id}`);
  }

}
