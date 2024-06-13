import { Injectable } from '@angular/core';
import { GetUsuarioByID, GetUsuarioResponse, PostUsuarioParams } from '@interfaces/usuario.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private endpoint = 'user';
  private endpoint1 = 'auth/register'; // Define el endpoint para la entidad Materia
  private _data = new BehaviorSubject<GetUsuarioResponse | null>(null);
  public data$ = this._data.asObservable();

  constructor(private apiService: ApiService) {}

  getAll(): Observable<GetUsuarioResponse> {
    return this.apiService.get<GetUsuarioResponse>(`${this.endpoint}`).pipe(
      tap(data => this._data.next(data))
    );
  }

  getById(id: number): Observable<GetUsuarioByID> {
    return this.apiService.get<GetUsuarioByID>(`${this.endpoint}/${id}`);
  }

  create(usuario: PostUsuarioParams): Observable<any> {
    return this.apiService.post<any, PostUsuarioParams>(this.endpoint1, usuario).pipe(
      tap(() => this.refreshData())
    );
  }

  update(id: number, usuario: PostUsuarioParams): Observable<any> {
    return this.apiService.patch<any, any>(`${this.endpoint}/${id}`, usuario);
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
