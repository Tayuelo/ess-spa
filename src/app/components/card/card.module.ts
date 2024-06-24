import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
  ],
})
export class CardModule {}
