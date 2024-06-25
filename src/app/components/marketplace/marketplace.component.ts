import {
  ChangeDetectionStrategy,
  Component,
  EffectRef,
  Injector,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonItem, IonCheckbox, IonButton } from '@ionic/angular/standalone';
import { ListLayoutComponent } from '../list-layout/list-layout.component';
import { ICard } from '../card/card.interface';
import { MarketplaceService } from './services/marketplace.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ECategory } from '@shared/index';
import { IBranchProduct, IBranchProfessional, IBranchService } from '@models/index';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

type TabIndex = 0 | 1 | 0;

@Component({
  selector: 'ess-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  standalone: true,
  imports: [IonButton, IonCheckbox, IonItem, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal, 
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    ListLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalController]
})
export class MarketplaceComponent implements OnInit {
  private marketplaceService = inject(MarketplaceService);

  public selectedIndex = signal<TabIndex>(0);
  public listOfElements = signal<ICard[]>([]);
  public fetchingData = signal(false);
  private selectedIndexEffect!: EffectRef;
  public selectedBranchId = signal('');
  message = 'This modal example uses the modalController to present and dismiss modals.';
  presentingElement!: HTMLElement;

  constructor(private injector: Injector, private route: ActivatedRoute, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.registerEffects();
    this.presentingElement = document.querySelector('.ion-page') as HTMLElement;
    this.route.params.pipe(map((x) => x['branchId'])).subscribe((branchId) => {
      this.selectedBranchId.set(branchId);
    });
  }

  private registerEffects() {
    this.selectedIndexEffect = effect(
      () => {
        this.fetchData(this.selectedIndex());
      },
      { allowSignalWrites: true, injector: this.injector }
    );
  }

  segmentChanged(evt: any) {
    this.selectedIndex.set(evt.detail.value);
  }

  private fetchData(selectedIndex: TabIndex) {
    return {
      '0': this.getBranchServices.bind(this),
      '1': this.getBranchProducts.bind(this),
      '2': this.getBranchProfessionals.bind(this),
    }[selectedIndex]();
  }

  // TODO: Error handling
  private getBranchServices() {
    this.marketplaceService
      .getListOfElements<IBranchService[]>(
        this.selectedBranchId(),
        ECategory.SERVICES
      )
      .subscribe({
        next: (branchServices) => {
          this.listOfElements.set(
            branchServices.map((branchService) => {
              return {
                id: branchService.uid,
                title: branchService.name,
                subtitle: branchService.details,
                content: branchService.price.toString(),
              };
            })
          );
        },
        error: () => {},
      });
  }

  private getBranchProducts() {
    this.marketplaceService
      .getListOfElements<IBranchProduct[]>(
        this.selectedBranchId(),
        ECategory.PRODUCTS
      )
      .subscribe({
        next: (branchProducts) => {
          this.listOfElements.set(
            branchProducts.map((branchProduct) => {
              return {
                id: branchProduct.uid,
                title: branchProduct.name,
                subtitle: branchProduct.details,
                content: branchProduct.price.toString(),
              };
            })
          );
        },
        error: () => {},
      });
  }

  private getBranchProfessionals() {
    this.marketplaceService
      .getListOfElements<IBranchProfessional[]>(
        this.selectedBranchId(),
        ECategory.PROFESSIONALS
      )
      .subscribe({
        next: (branchProfessionals) => {
          this.listOfElements.set(
            branchProfessionals.map((branchProfessional) => {
              return {
                id: branchProfessional.uid,
                title: branchProfessional.name,
                subtitle: branchProfessional.rating.toString(),
              };
            })
          );
        },
        error: () => {},
      });
  }

  public async onSelectedItemChange(selectedItem: ICard) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      presentingElement: this.presentingElement
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
