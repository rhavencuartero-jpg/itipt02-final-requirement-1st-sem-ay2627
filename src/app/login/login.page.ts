import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import type { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { albumsOutline, bookOutline, bookmarkOutline, eye, eyeOff, heartCircleOutline, heartOutline, libraryOutline, lockClosed, person } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonRow,
    IonText,
  ],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordInput') private passwordInput?: IonInput;

  private readonly router = inject(Router);
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor() {
    addIcons({
      person,
      lockClosed,
      eye,
      eyeOff,
      bookOutline,
      bookmarkOutline,
      libraryOutline,
      albumsOutline,
      heartOutline,
      heartCircleOutline,
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('lmsUserRole');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  focusPassword(event: Event): void {
    event.preventDefault();
    void this.passwordInput?.setFocus();
  }

  login(): void {
    const username = this.username.trim();
    const password = this.password;
    const normalizedUsername = username.toLowerCase();
    const demoPassword = password.trim();

    if (!username || !password) {
      alert('Please enter your username and password.');
      return;
    }

    if (normalizedUsername === 'admin' && demoPassword === 'admin') {
      localStorage.setItem('lmsDisplayName', 'admin');
      localStorage.setItem('lmsUserRole', 'admin');
      localStorage.setItem('lmsAdminLastLoginAt', new Date().toISOString());
      this.router.navigate(['/admin_homepage']);
      return;
    }

    const savedEmail = localStorage.getItem('lmsEmail');
    const savedPassword = localStorage.getItem('lmsPassword');
    const isHardcodedUser = normalizedUsername === 'user' && demoPassword === 'user';
    const isRegisteredUser = normalizedUsername === savedEmail?.trim().toLowerCase() && password === savedPassword;

    if (!isHardcodedUser && !isRegisteredUser) {
      alert('Invalid username or password.');
      return;
    }

    if (isHardcodedUser) {
      localStorage.setItem('lmsDisplayName', 'user');
    }

    localStorage.setItem('lmsUserRole', 'reader');
    this.router.navigate(['/reader_homepage']);
  }
}
