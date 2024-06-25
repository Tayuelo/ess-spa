import { ChangeDetectionStrategy, Component, OnInit, input, output } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { ICard } from '../card/card.interface';
import { CardModule } from '../card/card.module';

@Component({
  selector: 'ess-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
  imports: [IonList, CardModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListLayoutComponent  implements OnInit {
  public listOfElements = input<ICard[]>([]);
  public loading = input<boolean>(false);
  public selectedItem = output<ICard>();

  constructor() { }

  ngOnInit() {}
}
