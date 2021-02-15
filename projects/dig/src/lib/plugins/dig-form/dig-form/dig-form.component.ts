import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DigFormControlComponent} from '../dig-form-control/dig-form-control.component';

@Component({
  selector: 'dig-form',
  templateUrl: './dig-form.component.html',
  styleUrls: ['./dig-form.component.scss'],
})
export class DigFormComponent implements OnInit, AfterViewInit {
  @ContentChildren(DigFormControlComponent) controls;

  @Input() form: FormGroup;

  @Input() padding = true;

  // element attributes
  @Input() disabled: boolean;

  // text area
  @Input() rows: number;

  @Output() saved: EventEmitter<any> = new EventEmitter<any>();
  @Output() cleared: EventEmitter<void> = new EventEmitter<void>();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

  get isDisabled() {
    return this.disabled ? true : ! this.form.valid;
  }

  get classNames(): string[] {
    const classNames = ['dig-form'];
    if (this.padding) {
      classNames.push('ion-padding');
    }
    return classNames;
  }

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    // todo fix changed bug
    setTimeout(() => {
      this.controls.forEach(control => {
        if (! control.control) {
          control.control = this.form.get(control.name);
        }
      });
    });
  }

  save() {
    if (this.form.valid) {
      this.saved.emit(this.form.value);
    }
  }

  reset() {
    this.cleared.emit();
    this.form.reset();
  }

  cancel() {
    this.canceled.emit();
  }
}
