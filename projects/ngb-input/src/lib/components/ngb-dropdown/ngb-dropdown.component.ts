import { Component, Input, Output, EventEmitter, OnInit, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';

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
export class NgbDropdownDomponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    private static _requiredError = 'This field is required';
    private static _withoutOptions = ' ';
    private static _placeholder = 'Select an option';
    private _options: any[] = [];
    private model: any
    private propagateChange: any = (_: any) => {};
    private onTouched: any = (_: any) => {};
    public optionSelected: any;
    public withoutOptions = NgbDropdownDomponent._withoutOptions;
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
    public placeholder: string = NgbDropdownDomponent._placeholder;

    @Input()
    public label: string = '';

    @Input()
    public multiple: boolean;

    @Input()
    public optionLabel: string;

    @Input()
    public optionValue: string;

    @Input()
    public requiredError: string = NgbDropdownDomponent._requiredError;

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
            return this._options.filter(x => this.optionSelected && this.optionSelected.indexOf(x) == -1)
        }

        return this._options;
    }

    public set options(value: any[]) {
        this._options = value;
    }

    public static init(errorMessage: { required?: string; }, informationMessages: { empty?: string, placeholder?: string }) {
        NgbDropdownDomponent._requiredError = errorMessage.required || NgbDropdownDomponent._requiredError;
        NgbDropdownDomponent._withoutOptions = informationMessages.empty || NgbDropdownDomponent._withoutOptions;
        NgbDropdownDomponent._placeholder = informationMessages.placeholder || NgbDropdownDomponent._placeholder;
    }

    public ngOnInit(): void {
        if (this.required) {
            this.error = this.requiredError;
        }
        
        if (!Array.isArray(this.model)) {
            this.optionSelected = this.optionValue ?
                this._options.find(x => x[this.optionValue] == this.model) :
                this.model;
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
        // If the 
        if (changes.multiple && !this.model) {
            if (changes.multiple.currentValue === true) {
                this.model = [];
                this.optionSelected = [];
            } else if (changes.multiple.currentValue === false) {
                this.model = undefined;
                this.optionSelected = undefined;
            }
        } else if (changes.multiple && this.model) {
            if (changes.multiple.currentValue === true) {
                const optionValue = this.optionValue;
                this.optionSelected = optionValue ?
                    this._options.filter(x => this.model.find(x1 => this.compareObjects(x1, x[optionValue]))) :
                    this._options.filter(x => this.model.find(x1 => this.compareObjects(x1, x)));

            } else if (changes.multiple.currentValue === false) {
                this.optionSelected = this.model;
            }
        }
    }

    public selectOption(option: any) {
        const value = this.optionValue ? option[this.optionValue] : option;
        if (this.multiple) {
            this.optionSelected.push(option);
            this.model.push(value);
            this.error = '';
        } else {
            this.optionSelected = option;
            this.model = value;
        }
        
        this.dirty = true;
        this.onTouched(this.model);
        this.propagateChange(this.model);
        this.ngModelChange.emit(this.model);
        this.change.emit(this.model);
    }

    public unselectOption(event: Event, element: any) {
        event.stopPropagation();
        const index = this.optionSelected.indexOf(element);
        this.model.splice(index, 1);
        this.optionSelected.splice(index, 1);
        this.onTouched(this.model);
        this.propagateChange(this.model);
        this.ngModelChange.emit(this.model);
        this.change.emit(this.model);

        if (this.model.length == 0 && this.required) {
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

    private compareObjects(x: object, y: object): boolean {
        if (typeof(x) !== 'object') {
            return x == y;
        }
        for (let key of Object.keys(x)) {
            if (y[key] === undefined) {
                return false;
            }

            let typeofKeyX = typeof x[key];
            let typeofKeyY = typeof y[key];
            if (typeofKeyX != typeofKeyY) {
                return false;
            }

            if (typeofKeyX == 'function') {
                continue;
            }

            if (!this.compareObjects(x[key], y[key])) {
                return false;
            }
        }

        return true;
    }
}