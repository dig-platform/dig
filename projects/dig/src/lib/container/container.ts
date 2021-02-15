import {BehaviorSubject, isObservable, Observable, of, Subscription} from 'rxjs';
import {RegistryRef} from '../interfaces/registry-ref';
import {DigAppOptions} from '../interfaces';



export class Container {
    private refRegistry: RegistryRef[] = [];

    constructor(readonly options: DigAppOptions) {
    }

    set(id: string, obsRef: any, defaultValue: string = null): RegistryRef {
        if (! isObservable(obsRef)) {
            obsRef = of(obsRef);
        }
        let ref: RegistryRef = this.getRef(id);
        if (! ref) {
            if (this.options.cache) {
                const cached = localStorage.getItem(this.cacheKey(id));
                if (cached && cached !== 'undefined') {
                    defaultValue = JSON.parse(cached);
                }
            }
            ref = {
                id,
                subject: new BehaviorSubject<any>(defaultValue),
                ref: obsRef
            };
            this.refRegistry.push(ref);
        } else {
            ref.subscription.unsubscribe();
            ref.ref = obsRef;
        }
        ref.subscription = ref.ref.subscribe(res => {
            if (this.options.detectChanges) {
                // todo this is not matching, fix
                if (JSON.stringify(res) === JSON.stringify(ref.subject.getValue())) {
                    return false;
                }
            }
            if (this.options.cache) {
                localStorage.setItem(this.cacheKey(id), JSON.stringify(res));
            }
            ref.subject.next(res);
        });
        return ref;
    }

    getRef(id: string, create = false): RegistryRef {
        let ref = this.refRegistry.find(r => r.id === id);
        if (! ref && create) {
            ref = this.set(id, of(null));
        }
        return ref;
    }

    getObservable<T>(id: string): Observable<T> {
        try {
            return this.getRef(id, true).subject.asObservable();
        } catch (e) {
            console.error(e);
        }
    }

    getValue<T>(id: string): T {
        try {
            return this.getRef(id, true).subject.getValue();
        } catch (e) {
            console.error(e);
        }
    }

    destroy(id): void {
        const ref = this.getRef(id);

        // send undefined to notify any subscribers that this is destroyed
        ref.subject.next(undefined);

        // unsubscribe from the ref
        if (ref.subscription) {
            ref.subscription.unsubscribe();
        }

        const i = this.refRegistry.findIndex(r => r.id === id);
        this.refRegistry.splice(i, 1);
    }

    cacheKey(id: string): string {
        return `dig-platform-cache-${id}`;
    }
}
