import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DigUserMenuComponent} from './lib/dig-user-menu/dig-user-menu.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DigUserMenuComponent
  ],
  exports: [
    DigUserMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class DigUserModule { }
