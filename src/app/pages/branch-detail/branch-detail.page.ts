import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonAvatar, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MarketplaceComponent } from 'src/app/components/marketplace/marketplace.component';

@Component({
  selector: 'ess-branch-detail',
  templateUrl: './branch-detail.page.html',
  styleUrls: ['./branch-detail.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonAvatar, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, MarketplaceComponent]
})
export class BranchDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
