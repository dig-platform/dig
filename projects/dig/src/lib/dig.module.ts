import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dig} from './dig';
import {DigAppOptions} from './interfaces';
import {DigAppInjectionService} from './dig-app-injection.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class DigModule {
  static forRoot(digApp: DigAppOptions): ModuleWithProviders<DigModule> {
    return {
      ngModule: DigModule,
      providers: [
        {
          provide: DigAppInjectionService,
          useValue: digApp
        },
        Dig,
      ]
    };
  }
}
