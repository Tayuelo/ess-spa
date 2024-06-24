import { Component, ElementRef, Injectable, OnInit, ViewChild, inject, signal } from '@angular/core';
import { EventType, NavigationEnd, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonButton,
  IonMenuButton,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'ess-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButton,
    IonIcon,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild(IonBackButton) backButton!: IonBackButton;

  public router = inject(Router);
  public headerService = inject(HeaderService);
  public displayMenu = signal(false);
  public backButtonVisible = signal(true);
  public backButtonHref = this.headerService.backUrl;

  ngOnInit() { }
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public backUrl = signal('/home');
}