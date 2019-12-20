import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
    selector: 'ngb-file',
    templateUrl: './ngb-file.component.html',
    styleUrls: ['./ngb-file.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => NgbFileComponent)
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NgbFileComponent),
            multi: true
        }
    ]
})
export class NgbFileComponent implements OnInit, ControlValueAccessor, Validator {
    private static _requiredError = 'Required';
    private static _invalidTypeError = '';
    private static _maxSizeExceededError = 'A file exceeds the limit size';
    private static _placeholder = 'Load file';
    private static _dropMessage = 'Drop files here';
    private propagateChange: any = (_: any) => {};
    private onTouched: any = (_: any) => {};
    private _required: boolean;
    private _maxSize: number;
    public files: FileList;
    public error: string;
    public fileLoadedName: string;
    public dropMessage = NgbFileComponent._dropMessage;
    public isHover: boolean;

    @ViewChild('inputFile', { static: false })
    public inputFile: ElementRef<HTMLInputElement>

    @Output()
    public filesUploadedChange = new EventEmitter<FileList>();

    @Input()
    public id: string;

    @Input()
    public name: string;

    @Input()
    public accept: string;

    @Input()
    public multiple: boolean;

    @Input()
    public label: string;

    @Input()
    public placeholder: string = NgbFileComponent._placeholder;

    @Input()
    public invalidTypeError: string = NgbFileComponent._invalidTypeError;

    @Input()
    public maxSizeExceededError: string = NgbFileComponent._maxSizeExceededError;

    @Input()
    public disabled: boolean;

    @Input()
    public height: string = '200px';
    
    @Input()
    public width: string = '200px';

    @Input()
    public requiredError: string = NgbFileComponent._requiredError;

    @Input()
    public dirty: boolean;

    @Input()
    public get required(): boolean {
        return this._required;
    }

    public set required(val: boolean) {
        this._required = val;
        this.error = val && (!this.files || this.files.length == 0) ? this.requiredError : ''
    }

    @Input()
    public get maxSize(): number | string {
        return this._maxSize;
    }

    public set maxSize(value: number | string) {
        if (typeof value === 'number') {
            this._maxSize = value;
        } else {
            if (!/^\d+(\s)?(kb|mb|gb){2}$/.test(value)) {
                console.error('The value must be a number or a string with the subffix kb, mb or gb');
                return;
            }

            const num = parseFloat(value.match(/^\d+/)[0]);
            const subffix = value.match(/\w+$/)[0].toLowerCase();
            switch (subffix) {
                case 'kb':
                    this._maxSize = num * 1024;
                    break;
                case 'mb':
                    this._maxSize = num * 1024 * 1024;
                    break;
                case 'gb':
                    this._maxSize = num * 1024 * 1024 * 1024;
                    break;
            }
        }
    }

    public static init(errorMessages: { required?: string; invalidType?: string; maxSizeExceeded?: string; }, informationMessages: { placeholder?: string; drop?: string; }) {
        NgbFileComponent._requiredError = errorMessages.required || NgbFileComponent._requiredError;
        NgbFileComponent._invalidTypeError = errorMessages.invalidType || NgbFileComponent._invalidTypeError;
        NgbFileComponent._maxSizeExceededError = errorMessages.maxSizeExceeded || NgbFileComponent._maxSizeExceededError;
        NgbFileComponent._placeholder = informationMessages.placeholder || NgbFileComponent._placeholder;
        NgbFileComponent._dropMessage = informationMessages.drop || NgbFileComponent._dropMessage;
    }

    public ngOnInit(): void {
        if (this.required) {
            this.error = this.requiredError;
        }
    }

    public filesDropped(event: FileList) {
        if (this.disabled) {
            return;
        }

        this.updateModel(event);
    }

    public filesHovered(isHover: boolean) {
        if (this.disabled) {
            return;
        }
        this.isHover = isHover;
    }

    // public onInputFileChange(event: Event) {
    //     let files: FileList = event.target['files'];
    //     if (files.length == 0) {
    //         return;
    //     }

    //     this.updateModel(files)
    // }

    public writeValue(obj: any): void {
        if (obj) {
            this.files = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public validate(control: AbstractControl): ValidationErrors | null {
        if (this.required && (!this.files || this.files.length == 0)) {
            return {
                valid: false
            }
        }

        return null;
    }

    public filesClick() {
        const fileInput = document.createElement('input');
        const body = document.querySelector('body');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        
        fileInput.onchange = (event: Event) => {
            let files: FileList = event.target['files'];
            body.removeChild(fileInput);
            if (files.length == 0) {
                return;
            }
    
            this.updateModel(files)
        }

        body.appendChild(fileInput);
        fileInput.click();
    }

    private updateModel(fileList: FileList) {
        if (this.maxSize) {
            for (let file of Array.from(fileList)) {
                if (file.size > this.maxSize) {
                    this.error = this.maxSizeExceededError;
                    return;
                }
            }
        }

        this.error = '';
        this.files = fileList;
        this.fileLoadedName = fileList.length == 1 ? fileList[0].name : `Se cargaron ${fileList.length} archivos`
        this.filesUploadedChange.emit(fileList);
        this.propagateChange(fileList);
        this.onTouched(fileList);
    }
}