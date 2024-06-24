import { Component, OnInit, input } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { ICard } from '../card/card.interface';
import { CardModule } from '../card/card.module';

@Component({
  selector: 'ess-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
  imports: [IonList, CardModule],
  standalone: true,
})
export class ListLayoutComponent  implements OnInit {
  public listOfElements = input<ICard[]>([]);
  public loading = input<boolean>(false);

  constructor() { }

  ngOnInit() {}

}
