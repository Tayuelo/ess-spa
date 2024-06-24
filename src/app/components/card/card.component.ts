import { Component, InputSignal, InputSignalWithTransform, OnInit, input, model } from '@angular/core';
import { ICard } from './card.interface';

@Component({
  selector: 'ess-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ data().title }}</ion-card-title>
        <ion-card-subtitle>{{ data().subtitle }}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        {{ data().content }}
      </ion-card-content>
    </ion-card>
  `,
})
export class CardComponent implements OnInit {
  public data = input.required<ICard>();
  // public optional: InputSignalWithTransform<boolean, string | boolean> = input.required({
  //   transform: (v: string | boolean) => {
  //     return !!v;
  //   },
  //   alias: 'second'
  // });

  // public another = input.required({
  //   transform: (v: string | boolean) => {
  //     return !!v;
  //   }
  // });

  public selected = model();

  constructor() {}

  ngOnInit() {}
}
