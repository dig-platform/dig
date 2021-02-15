import {Component, Input, OnInit} from '@angular/core';
import {DigUserController, UserControllerOptions} from '../dig-user-controller';

@Component({
  selector: 'dig-user-menu',
  templateUrl: './dig-user-menu.component.html',
  styleUrls: ['./dig-user-menu.component.scss'],
})
export class DigUserMenuComponent implements OnInit {
  @Input() authRedirect: string;
  @Input() noAuthRedirect: string;

  get options(): UserControllerOptions {
    const options: UserControllerOptions = {};
    if (this.authRedirect) {
      options.authRedirect = this.authRedirect;
    }
    if (this.noAuthRedirect) {
      options.noAuthRedirect = this.noAuthRedirect;
    }
    return options;
  }

  constructor(readonly userController: DigUserController) { }

  ngOnInit(): void {}

}
