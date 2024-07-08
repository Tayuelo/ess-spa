import { ChangeDetectorRef, Component, Input, ViewChild, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
  IonFabButton,
  IonFab,
  IonIcon,
  IonList,
  IonItem,
  IonModal,
  IonButtons,
  IonInput,
  IonNav,
  IonMenu,
  IonMenuButton, IonBackButton } from '@ionic/angular/standalone';
import { PARTNERS } from '../../constants/partners';
import { CardModule } from '../../components/card/card.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UpcomingComponent } from 'src/app/components/upcoming/upcoming.component';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { HeaderComponent, HeaderService } from 'src/app/components/header/header.component';
import { NavController } from '@ionic/angular';
import { PartnersService } from 'src/app/services/partners/partners.service';
import { IBranch } from 'src/app/constants/branches';
import { IPartner } from '@models/partner/partner.model';

@Component({
  selector: 'ess-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonBackButton, 
    IonNav,
    IonInput,
    IonButtons,
    IonModal,
    IonItem,
    IonList,
    IonFooter,
    CardModule,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    UpcomingComponent,
    IonFabButton,
    IonFab,
    IonIcon,
    FormsModule,
    IonMenu,
    IonMenuButton,
    HeaderComponent
  ],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  private router = inject(Router);
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);
  public headerService = inject(HeaderService);
  private partnersService = inject(PartnersService);

  public partners = signal<IPartner[]>([]);

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  ngOnInit() {
    this.partnersService.getPartners().subscribe((partners: IPartner[]) => {
      this.partners.set(partners);
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  public goToPartnerDetail(id: string) {
    this.headerService.backUrl.set('/home');
    this.navCtrl.navigateForward(`/partner-detail/${id}`);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
