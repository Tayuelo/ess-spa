import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, map } from 'rxjs';
import { IBranch } from 'src/app/constants/branches';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private apiService = inject(ApiService);

  public getBranchById(branchId: string): Observable<IBranch> {
    return this.apiService.get<IBranch>(`/branch/${branchId}`);
  }
}
