import { ChangeDetectionStrategy, Component, EffectRef, Injector, OnInit, effect, signal } from '@angular/core';
import { IonSegment, IonSegmentButton, IonLabel, IonContent } from "@ionic/angular/standalone";
import { ListLayoutComponent } from '../list-layout/list-layout.component';
import { ICard } from '../card/card.interface';

type TabIndex = 0 | 1 | 0;

@Component({
  selector: 'ess-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  standalone: true,
  imports: [IonContent, IonSegment, IonSegmentButton, IonLabel, ListLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComponent  implements OnInit {

  public selectedIndex = signal<TabIndex>(0);
  public listOfElements = signal<ICard[]>([]);
  public fetchingData = signal(false);
  private selectedIndexEffect!: EffectRef;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.registerEffects();
  }

  private registerEffects() {
    this.selectedIndexEffect = effect(() => {
      this.fetchData(this.selectedIndex());
    }, { allowSignalWrites: true, injector: this.injector });
  }

  segmentChanged(evt: any) {
    this.selectedIndex.set(evt.detail.value);
  }

  private fetchData(selectedIndex: TabIndex) {
    return {
      '0': this.getBranchServices.bind(this),
      '1': this.getBranchProducts.bind(this),
      '2': this.getBranchProfessionals.bind(this)
    }[selectedIndex]();
  }

  private getBranchServices() {
    this.fetchingData.set(true);
  }

  private getBranchProducts() {
    this.fetchingData.set(true);
  }

  private getBranchProfessionals() {
    this.fetchingData.set(true);
  }
}
