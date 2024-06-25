import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ECategory } from '@shared/index';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  private apiService = inject(ApiService);

  public getListOfElements<T>(
    branchId: string,
    category: ECategory
  ): Observable<T> {
    return this.apiService
      .get<T>(`/branch-details/${branchId}/${category}`)
      .pipe(map((response: any) => response[category]));
  }
}
