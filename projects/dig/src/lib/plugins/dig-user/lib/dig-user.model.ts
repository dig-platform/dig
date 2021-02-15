import {Injectable} from '@angular/core';
import {Dig} from '../../../../../../dig';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

export interface DigUser {
  uid: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  photoURL?: string;
}

export const DIG_USER_KEY = 'dig_user';

@Injectable({
  providedIn: 'root'
})
export class DigUserModel {
  constructor(private dig: Dig, private auth: AngularFireAuth) {
    this.init();
  }

  init() {
    // persist the user session in local storage so it loads immediately
    const persisted = localStorage.getItem(DIG_USER_KEY);
    const session = persisted ? JSON.parse(persisted) : null;
    this.dig.app.set(DIG_USER_KEY, this.auth.authState.pipe(map(u => {
      if (u) {
        const user = this.map(u);
        this.persist(user);
        return user;
      } else {
        localStorage.removeItem(DIG_USER_KEY);
        return null;
      }
    })), session);
  }

  persist(u: DigUser) {
    localStorage.setItem(DIG_USER_KEY, JSON.stringify(this.map(u)));
  }

  map(u: any): DigUser {
    return  {
      uid: u.uid,
      email: u.email,
      phoneNumber: u.phoneNumber,
      displayName: u.displayName,
      photoURL: u.photoURL
    };
  }

  getValue(): DigUser {
    return this.dig.app.getValue<DigUser>(DIG_USER_KEY);
  }

  getObservable(): Observable<DigUser> {
    return this.dig.app.getObservable<DigUser>(DIG_USER_KEY);
  }

  destroy() {
    localStorage.removeItem(DIG_USER_KEY);
    this.dig.app.set(DIG_USER_KEY, null);
  }
}
