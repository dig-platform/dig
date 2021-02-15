import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DigFormComponent} from './dig-form/dig-form.component';
import {DigFormControlComponent} from './dig-form-control/dig-form-control.component';
import {DigFormHelperTextComponent} from './dig-form-helper-text/dig-form-helper-text.component';
import {DigFormLabelComponent} from './dig-form-label/dig-form-label.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    DigFormComponent,
    DigFormControlComponent,
    DigFormHelperTextComponent,
    DigFormLabelComponent
  ],
  exports: [
    DigFormControlComponent,
    DigFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class DigFormModule { }
