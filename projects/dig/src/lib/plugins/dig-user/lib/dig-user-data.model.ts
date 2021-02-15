
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Dig} from '../../../../../../dig';
import {DigUserModel} from './dig-user.model';

export const USER_DATA = 'user_data';

/**
 * The user data model provides read / write access to the current user's data
 */
@Injectable({
  providedIn: 'root'
})
export class DigUserDataModel {

  constructor(private dig: Dig, private digUserModel: DigUserModel) {
    this.init();
  }

  collection(queryFn?: any) {
    return this.dig.db().collection(USER_DATA, queryFn);
  }

  init() {
    this.digUserModel.getObservable().subscribe((user: any) => {
      if (user) {
        this.dig.app.set(USER_DATA, this.dataRef().valueChanges({idField: 'id'}));
      } else {
        this.dig.app.set(USER_DATA, null);
      }
    });
  }

  set(key, data) {
    this.dataRef().doc(key).set({data});
  }

  update(key, data) {
    this.dataRef().doc(key).update({data});
  }

  getValue<T>(key): T {
    return this.mapValue<T>(key, this.dig.app.getValue<T[]>(USER_DATA));
  }

  getObservable<T>(key: string): Observable<T> {
    return this.dig.app.getObservable<T[]>(USER_DATA).pipe(map(res => this.mapValue<T>(key, res)));
  }

  private mapValue<T>(key: string, res: any): T {
    const doc = res.find(d => d.id === key);
    return doc ? {...doc}.data : null;
  }

  private dataRef() {
    const user: {uid: string} = this.digUserModel.getValue();
    if (! user) {
      throw new Error('Unable to fetch data ref');
    }
    return this.collection().doc(user.uid).collection('data');
  }
}
