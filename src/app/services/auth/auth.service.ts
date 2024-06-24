import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiService = inject(ApiService);
  public isLoggedIn = signal(false);

  signIn(credentials: { email: string; password: string }) {
    return this.apiService.post('/sign-in', credentials);
  }

  signUp(credentials: { email: string; password: string }) {
    return this.apiService.post('/sign-up', credentials);
  }

  logout() {
    return this.apiService.post('/logout', {});
  }

  isAuthenticated() {
    return this.apiService.get('/is-authenticated');
  }
}
