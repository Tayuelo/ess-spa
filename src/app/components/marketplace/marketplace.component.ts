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
  IonContent,
} from '@ionic/angular/standalone';
import { ListLayoutComponent } from '../list-layout/list-layout.component';
import { ICard } from '../card/card.interface';
import { MarketplaceService } from './services/marketplace.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ECategory } from '@shared/index';
import { IBranchProduct, IBranchProfessional, IBranchService } from '@models/index';

type TabIndex = 0 | 1 | 0;

@Component({
  selector: 'ess-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    ListLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceComponent implements OnInit {
  private marketplaceService = inject(MarketplaceService);

  public selectedIndex = signal<TabIndex>(0);
  public listOfElements = signal<ICard[]>([]);
  public fetchingData = signal(false);
  private selectedIndexEffect!: EffectRef;
  public selectedBranchId = signal('');

  constructor(private injector: Injector, private route: ActivatedRoute) {}

  ngOnInit() {
    this.registerEffects();
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
                title: branchProfessional.name,
                subtitle: branchProfessional.rating.toString(),
              };
            })
          );
        },
        error: () => {},
      });
  }
}
