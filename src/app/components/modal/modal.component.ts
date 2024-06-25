import { Component, OnInit } from '@angular/core';
import {
  IonModal,
  IonButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonContent,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ess-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    IonInput,
    IonItem,
    IonContent,
    IonButtons,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButton,
    IonModal,
    FormsModule,
  ],
  standalone: true,
})
export class ModalComponent implements OnInit {
  name!: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
