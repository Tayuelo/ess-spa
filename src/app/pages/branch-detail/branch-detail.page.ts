import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { HeaderComponent, HeaderService } from 'src/app/components/header/header.component';
import { MarketplaceComponent } from 'src/app/components/marketplace/marketplace.component';
import { BranchesService } from 'src/app/services/branches/branches.service';
import { IBranch } from 'src/app/constants/branches';

@Component({
  selector: 'ess-branch-detail',
  templateUrl: './branch-detail.page.html',
  styleUrls: ['./branch-detail.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonAvatar,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    MarketplaceComponent,
  ],
})
export class BranchDetailPage implements OnInit {
  @Input('id') branchId = '';
  private headerService = inject(HeaderService);
  private branchService = inject(BranchesService);
  public branchDetails = signal<IBranch | null>(null);

  constructor() {}

  ngOnInit() {
    this.branchService.getBranchById(this.branchId).subscribe((branch: IBranch) => {
      this.branchDetails.set(branch);
      this.headerService.backUrl.set(`/partner-detail/${branch.partnerId}`);
    });
  }
}
