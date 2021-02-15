import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {DigUserModel} from './dig-user.model';
import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userModel: DigUserModel) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userModel.getObservable().pipe(
      first(),
      map(u => {
        if (! u) {
          this.router.navigate(['/landing']);
          return false;
        }
        return true;
      })
    );
  }
}
