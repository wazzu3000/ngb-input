import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbInputComponent } from '../components/ngb-input/ngb-input.component';
import { Subscription, Subject } from 'rxjs';
import { NgbInputModel } from '../models/ngb-input.model';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

const errorClass = 'is-invalid';

@Directive({
    selector: '[ngbInputDirective]'
})
export class NgbInputDirective implements OnInit, OnDestroy {
    private delay = new Subject<any>();
    private inputSubscription: Subscription;
    private debounce: number;

    @Input('ngbInputDirective')
    public ngbInput: NgbInputComponent;

    public constructor(private el: ElementRef<HTMLInputElement>) { }

    public ngOnInit(): void {
        let input = this.el.nativeElement;
        this.inputSubscription = this.ngbInput.observableInput.subscribe(x => this.updateAttribute(x));
        this.debounce = this.ngbInput.debounce;
        input.classList.add('form-control');
        input.id = this.ngbInput.id;
        input.name = this.ngbInput.name;
        input.value = this.ngbInput.ngModel === undefined ? this.ngbInput.value : this.ngbInput.ngModel;
        input.placeholder = this.ngbInput.placeholder || '';
        input.pattern = this.ngbInput.pattern;
        input.required = this.ngbInput.required;
        input.disabled = this.ngbInput.disabled;
        if (this.debounce) {
            input.oninput = ev => this.onUserInputWithDelay(ev);
        } else {
            input.oninput = ev => this.onUserInput(ev);
        }
        input.onfocus = ev => this.ngbInput.saveValue(ev.currentTarget['value']);
        input.onblur = ev => {
            this.ngbInput.setInputAsDirty();
            this.ngbInput.blur.emit(ev);
        }

        if (input instanceof HTMLInputElement) {
            input.type = this.ngbInput.type;
        }
        if (this.ngbInput.error && this.ngbInput.dirty) {
            this.el.nativeElement.classList.add(errorClass);
        }

        this.delay.pipe(
            debounceTime(this.debounce),
            distinctUntilChanged()
        ).subscribe(() => {
            this.ngbInput.onChangeModel(input.value)
        });
    }

    public ngOnDestroy(): void {
        this.inputSubscription.unsubscribe();
        this.delay.unsubscribe();
    }

    private updateAttribute(ngbInput: NgbInputModel) {
        switch (ngbInput.attribute) {
            case 'ngModel':
                this.el.nativeElement.value = ngbInput.value;
                break;
            case 'error':
                if (!!ngbInput.value) { // has error
                    this.el.nativeElement.classList.add(errorClass);
                } else {
                    this.el.nativeElement.classList.remove(errorClass);
                }
                break;
            case 'debounce':
                let input = this.el.nativeElement as HTMLInputElement;
                if (this.debounce) {
                    input.oninput = ev => this.onUserInputWithDelay(ev);
                } else {
                    input.oninput = ev => this.onUserInput(ev);
                }
                break;
            case 'type':
                this.el.nativeElement[ngbInput.attribute] = ngbInput.value;
                break;
            default:
                this.el.nativeElement[ngbInput.attribute] = ngbInput.value;
                break;
        }
    }

    private onUserInput(ev: Event) {
        this.ngbInput.onChangeModel(ev.currentTarget['value']);
    }

    private onUserInputWithDelay(ev: Event) {
        this.delay.next(ev.currentTarget['value']);
    }
}