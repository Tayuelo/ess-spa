import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public set(key: string, value: any) {
    // Encryption?
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T {
    return <T>localStorage.getItem(key);
  }
}
