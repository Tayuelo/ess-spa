import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput, IonItem } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ess-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonItem, 
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    IonInput,
  ],
})
export class AuthPage {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public register = signal(false);

  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public signUp(e: Event) {
    e.preventDefault();
    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.register.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  public signIn(e: Event) {
    e.preventDefault();
    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }
}
