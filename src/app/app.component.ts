import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonMenu,
  IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonBackButton,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonMenu,
  ],
})
export class AppComponent {
  public authService = inject(AuthService);
  

  constructor() {
    addIcons(ionIcons);
  }
}
