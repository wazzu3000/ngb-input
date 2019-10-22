import { Component, Input, Output, EventEmitter, forwardRef, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { NgbInputModel } from '../../models/ngb-input.model';

const inputAttributes = [
    'id', 'name', 'type', 'value', 'placeholder', 'required', 'disabled',
    'readonly', 'debounce', 'ngModel'
];

@Component({
    selector: 'ngb-input',
    templateUrl: './ngb-input.component.html',
    exportAs: 'ngbInputComponent',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => NgbInputComponent)
        }
    ]
})
export class NgbInputComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
    private sourceInput = new Subject<NgbInputModel>();
    private _pattern: RegExp;
    private _patternStr: string;
    private _dirty: boolean;
    private originalValue: any;
    private onChange: any = () => {};
    private onTouched: any = () => {};
    public self = this;
    public error: string;
    public showDefaultTemplate: boolean = false;

    @ViewChild('externalContentContainer', { static: false })
    private externalContentContainer: ElementRef<HTMLDivElement>;

    @Input()
    public type: 'date' | 'datetime' | 'email' | 'month' | 'number' | 'password'
        | 'tel' | 'text' | 'time' | 'url' | 'week' = 'text';

    @Input()
    public name: string;
    
    @Input()
    public id: string;

    @Input()
    public value: any = '';

    @Input()
    public placeholder: string = '';

    @Input()
    public required: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public readonly: boolean;

    @Input()
    public label: string;

    @Input()
    public debounce: number;

    @Input()
    public ngModel: any;

    @Input()
    public requiredError: string = 'Campo requerido';

    @Input()
    public formattError: string = 'Formato invalido';

    @Input()
    public manuallyHandleErrors: boolean;

    @Input()
    public showRequiredError: boolean;

    @Input()
    public showFormattError: boolean;

    @Output()
    public ngModelChange = new EventEmitter<any>();

    @Output()
    public change = new EventEmitter<any>();

    @Output()
    public blur = new EventEmitter<FocusEvent>()

    @Input()
    public get pattern(): string {
        return this._patternStr;
    }

    public set pattern(value: string) {
        this._patternStr = value;
        this._pattern = new RegExp(value);
        this.validateInput();
    }

    @Input()
    public get dirty(): boolean {
        return this._dirty;
    }

    public set dirty(value: boolean) {
        this._dirty = value;
        this.validateInput();
    }

    public get observableInput(): Observable<NgbInputModel> {
        return this.sourceInput.asObservable();
    }

    @Input()
    public multiLine: boolean;

    public ngOnInit() {
        if (this.pattern) {
            return;
        }
        
        switch (this.type) {
            case 'date':
                break;
            case 'datetime':
                break;
            case 'email':
                this.pattern = '^\\w+((\\.|-)\\w+)*@\\w+(\\.\\w+)*$';
                break;
            case 'number':
                break;
            case 'password':
                this.pattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])';
                break;
            case 'tel':
                break;
            case 'time':
                break;
            case 'url':
                break;
            case 'week':
                break;
        }

        this._pattern = new RegExp(this.pattern);
        if (this.pattern) {
            this.sourceInput.next({
                attribute: 'pattern',
                value: this.pattern
            });
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() =>
            this.showDefaultTemplate = this.externalContentContainer.nativeElement.childElementCount == 0
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        for (let attribute of Object.keys(changes)) {
            if (inputAttributes.indexOf(attribute) > -1) {
                this.sourceInput.next({
                    attribute,
                    value: changes[attribute].currentValue
                });
            }
        }

        if (this.manuallyHandleErrors ) {
            if (this.showRequiredError && this.dirty) {
                this.error = this.requiredError;
            } else if (this.showFormattError && this.dirty) {
                this.error = this.formattError;
            } else {
                this.error = ''
            }

            this.sourceInput.next({
                attribute: 'error',
                value: this.error
            });
        }
    }

    public writeValue(obj: any): void {
        if (obj) {
            this.ngModel = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public onChangeModel(val: any) {
        this.ngModelChange.emit(this.type == 'number' ? parseFloat(val) : val);
        this.change.emit(val);
        this.validateInput();
    }

    public saveValue(value: any) {
        this.originalValue = value;
    }

    public setInputAsDirty() {
        if (this.originalValue != this.ngModel) {
            this.dirty = true;
        }
        this.validateInput()
    }

    private validateInput() {
        if (!this.dirty || this.manuallyHandleErrors) {
            return;
        }

        setTimeout(() => {
            this.setErrorMessage();
            if (this.dirty) {
                this.sourceInput.next({
                    attribute: 'error',
                    value: this.error
                });
            }
        });
    }

    private setErrorMessage() {
        let model = this.ngModel;
        if (this.required && !model) {
            this.error = this.requiredError;
        } else if (this.pattern && !this._pattern.test(model)) {
            this.error = this.formattError;
        } else {
            this.error = '';
        }
    }
}
