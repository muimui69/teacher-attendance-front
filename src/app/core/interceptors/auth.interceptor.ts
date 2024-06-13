// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define las rutas que no requieren autenticación
    const publicUrls = [
      '/registro',
      '/js/',
      '/css/',
      '/img/',
      '/api/auth/'
    ];

    // Verifica si la URL de la solicitud es una ruta pública
    const isPublicUrl = publicUrls.some(url => req.url.includes(url));

    if (!isPublicUrl) {
      const token = localStorage.getItem('token'); // O lee el token de las cookies

      if (token) {
        // Clona la solicitud y agrega el encabezado de autorización
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(cloned);
      }
    }

    // Si es una ruta pública o no requiere token, sigue la solicitud original
    return next.handle(req);
  }
}
