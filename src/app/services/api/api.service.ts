import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, {
      withCredentials: true,
    });
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }
}
