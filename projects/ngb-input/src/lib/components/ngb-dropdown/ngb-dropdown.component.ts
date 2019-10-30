import { Component, Input, Output, EventEmitter, OnInit, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
    selector: 'ngb-dropdown',
    templateUrl: './ngb-dropdown.component.html',
    styleUrls: ['./ngb-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgbDropdownDomponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NgbDropdownDomponent),
            multi: true
        }
    ]
})
export class NgbDropdownDomponent implements OnInit, /*OnChanges,*/ ControlValueAccessor, Validator {
    private _options: any[] = [];
    private model: any
    private propagateChange: any = (_: any) => {};
    private onTouched: any = (_: any) => {};
    public error: string;
    public selected: boolean;

    @Input()
    public name: string;

    @Input()
    public id: string;

    @Input()
    public required: boolean;

    @Input()
    public disabled: boolean;

    @Output()
    public change = new EventEmitter<any>()

    @Input()
    public emptyText: string = 'Seleccione una opción'

    @Input()
    public label: string = ''

    @Input()
    public multiple: boolean;

    @Input()
    public optionLabel: string;

    @Input()
    public optionValue: string;

    @Input()
    public requiredError: string = 'Seleccione una opción';

    @Input()
    public dirty: boolean;

    @Input()
    public get ngModel(): any {
        return this.model;
    }

    public set ngModel(value: any) {
        if (this.required && !this.valueIsValid(value)) {
            this.error = this.requiredError;
        } else {
            this.error = '';
        }
        this.model = value;
    }

    @Output()
    public ngModelChange = new EventEmitter<any>();

    @Input()
    public get options(): any[] {
        if (this.multiple && this._options) {
            return this._options.filter(x => this.ngModel.indexOf(x) == -1)
        }

        return this._options;
    }

    public set options(value: any[]) {
        this._options = value;
    }

    public constructor() {}

    public ngOnInit(): void {
        if (this.required) {
            this.error = this.requiredError;
        }
    }

    public selectOption(option: any) {
        const value = this.optionValue ? option[this.optionValue] : option;
        if (this.multiple) {
            this.ngModel.push(value);
            this.error = '';
        } else {
            this.ngModel = value;
        }
        
        this.dirty = true;
        this.onTouched(this.ngModel);
        this.propagateChange(this.ngModel);
        this.ngModelChange.emit(this.ngModel);
        this.change.emit(this.ngModel);
    }

    public unselectOption(event: Event, element: any) {
        event.stopPropagation();
        const index = this.ngModel.indexOf(element);
        this.ngModel.splice(index, 1);
        this.onTouched(this.ngModel);
        this.propagateChange(this.ngModel);
        this.ngModelChange.emit(this.ngModel);
        this.change.emit(this.ngModel);

        if (this.ngModel.length == 0 && this.required) {
            this.error = this.requiredError;
        }
    }

    public writeValue(obj: any): void {
        if (obj) {
            this.model = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        if (this.required && !this.model) {
            return {
                valid: false
            }
        }

        return null;   
    }

    public valueIsValid(value: any | any[]) {
        if (value instanceof Array) {
            return value.length > 0;
        } else {
            return !!value;
        }
    }
}