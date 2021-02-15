import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dig-form-control',
  templateUrl: './dig-form-control.component.html',
  styleUrls: ['./dig-form-control.component.scss'],
})
export class DigFormControlComponent implements OnInit {
  @Input() name: string;
  @Input() helperText: string;
  @Input() label: string;
  @Input() control: FormControl;
  @Input() type: 'text' | 'email' | 'number' | 'textarea';

  constructor() { }

  ngOnInit() {}

}
