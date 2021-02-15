import { Component } from '@angular/core';
import {Dig} from '../../projects/dig/src/lib/dig';
import {BehaviorSubject} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dig-package';
  constructor(private dig: Dig) {
    console.log(dig.app.getValue('title'));
    const s = new BehaviorSubject('test');
    dig.app.set('tester', s);
    dig.app.getObservable('tester').subscribe(console.log);
    s.next('test 2');
  }
}
