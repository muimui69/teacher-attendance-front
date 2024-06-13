// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { LoginService } from '@services/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) { }

    private getHeaders(): HttpHeaders {
        const token = this.loginService.userToken;
        return new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
            headers: this.getHeaders(),
        });
    }

    post<T, B>(endpoint: string, body: B): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    put<T, B>(endpoint: string, body: B): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    patch<T, B>(endpoint: string, body: B): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
            headers: this.getHeaders()
        });
    }
}
