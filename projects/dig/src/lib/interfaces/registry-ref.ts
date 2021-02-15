import {BehaviorSubject, Subscription} from 'rxjs';

export interface RegistryRef {
  id: string;
  subject: BehaviorSubject<any>;
  ref: any;
  subscription?: Subscription;
}
