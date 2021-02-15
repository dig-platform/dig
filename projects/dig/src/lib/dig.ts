import {Inject, Injectable} from '@angular/core';
import {DigAppInjectionService} from './dig-app-injection.service';
import {DigAppOptions} from './interfaces';
import {Container} from './container/container';

const DEFAULT_OPTIONS: DigAppOptions = {
  cache: true,
  detectChanges: true
}

@Injectable({
  providedIn: 'root'
})
export class Dig {
  readonly app: Container;

  constructor(@Inject(DigAppInjectionService) private appOptions) {
    if (appOptions) {
      this.app = this.factory(appOptions);
    }
  }


  factory(options: DigAppOptions = DEFAULT_OPTIONS): Container {
    const container = new Container(options);
    if (options.initialState) {
      Object.keys(options.initialState).forEach(key => {
        container.set(key, options.initialState[key]);
      });
    }
    return container;
  }
}
