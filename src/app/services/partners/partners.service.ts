import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IPartner } from '@models/partner/partner.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  private apiService = inject(ApiService);

  public getPartners(): Observable<IPartner[]> {
    return this.apiService.get<IPartner[]>('/partners');
  }

  public getPartnerDetails(partnerId: string): Observable<IPartner> {
    return this.apiService.get<IPartner>(
      `/partners/partner-details/${partnerId}`
    );
  }
}
