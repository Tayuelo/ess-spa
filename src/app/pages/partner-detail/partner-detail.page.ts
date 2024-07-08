import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import {
  HeaderComponent,
  HeaderService,
} from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { CardModule } from 'src/app/components/card/card.module';
import { IBranch } from 'src/app/constants/branches';
import { PartnersService } from 'src/app/services/partners/partners.service';
import { IPartner } from '@models/partner/partner.model';

@Component({
  selector: 'ess-partner-detail',
  templateUrl: './partner-detail.page.html',
  styleUrls: ['./partner-detail.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFooter,
    HeaderComponent,
    CardModule,
  ],
})
export class PartnerDetailPage {
  @Input('id') partnerId = '';
  private navCtrl = inject(NavController);
  public headerService = inject(HeaderService);
  private partnersService = inject(PartnersService);
  public branches = signal<IBranch[]>([]); // [...BRANCHES].sort((a, b) => (a.name > b.name ? 1 : -1));
  public partnerDetail = signal<IPartner | null>(null);

  ngOnInit() {
    this.headerService.backUrl.set('/home');
    this.partnersService
      .getPartnerDetails(this.partnerId)
      .subscribe((partnerDetails: IPartner) => {
        this.branches.set(partnerDetails.branches);
        this.partnerDetail.set(partnerDetails);
      });
  }

  navigateToServiceDetailPage() {
    this.headerService.backUrl.set('/partner-detail');
    this.navCtrl.navigateForward(
      `/partner-detail/${this.partnerId}/branch/6679e97183e8e01ca9441669`
    );
  }

  goTobranchDetail(branchId: string) {
    this.navCtrl.navigateForward(
      `/branch/${branchId}`
    );
  }
}
