import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = { id: 0, name: 'Usuario', lastName: '' };
  userSignal = signal<User>(this.user);

  constructor() {
    this.loadUserData();
  }

  setUserData(data: Partial<User>) {
    if (!data) throw new Error("Error, user data can't be null");

    this.user = Object.assign(this.user, data);
    this.userSignal.update(() => this.user);
    this.saveUserData();
  }

  private async loadUserData() {
    const data = (await Preferences.get({ key: 'user' })).value;

    if (!data) return;
    const userData = JSON.parse(data);
    if (userData) {
      this.user = userData;
      this.userSignal.update(() => this.user);
    }
  }

  private async saveUserData() {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(this.user),
    });
  }
}
