import {Injectable} from '@angular/core';
import {Dig} from '@dig-platform/dig';
import {Counter} from './sharded-counter';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigCounterModel {
  public readonly data$: Observable<any> = this.dig.app.getObservable('counter');
  constructor(private afs: AngularFirestore, private dig: Dig) {
    this.dig.app.set('counter', this.afs.collection('dig_counter').valueChanges({idField: 'docId'}).pipe(map(data => {
      const count: any = {};
      if (data) {
        // todo replace with a reducer function
        data.forEach(section => {
          Object.keys(section).forEach(key => {
            if (key === 'docId') {
              return;
            }
            if (! count[section.docId]) {
              count[section.docId] = {};
            }
            count[section.docId][key] = section[key];
          });
        });
      }
      return count;
    })));
  }

  increment(section: string, key: string): void {
    this.getCounter(section, key).incrementBy(1);
  }

  decrement(section: string, key: string): void {
    this.getCounter(section, key).incrementBy(-1);
  }

  move(section: string, from: string, to: string): void {
    this.decrement(section, from);
    this.increment(section, to);
  }

  getCounter(section: string, key: string): Counter {
    const path = 'dig_counter/' + section;
    return new Counter(this.afs.doc(path), key);
  }
}
