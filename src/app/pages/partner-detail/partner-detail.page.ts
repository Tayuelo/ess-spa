import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent, HeaderService } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'ess-partner-detail',
  templateUrl: './partner-detail.page.html',
  styleUrls: ['./partner-detail.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, 
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
  ],
})
export class PartnerDetailPage {
  @Input('id') partnerId = '';
  private navCtrl = inject(NavController);
  public headerService = inject(HeaderService);

  navigateToServiceDetailPage() {
    this.headerService.backUrl.set('/partner-detail');
    this.navCtrl.navigateForward('/service-detail/1');
  }
}
