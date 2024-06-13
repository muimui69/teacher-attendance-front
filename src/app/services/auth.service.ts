import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  login(credentials: any) {
    // Llama al método post del ApiService para enviar las credenciales al endpoint de login
    return this.apiService.post<any, any>('login', credentials);
  }

  logout() {
    // Llama al método get del ApiService para enviar una solicitud de logout al endpoint correspondiente
    return this.apiService.get<any>('logout');
  }


}
