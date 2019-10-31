import { Component, Input, Output, EventEmitter, OnInit, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

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
    private propagateChange: any = (_: any) => {};
    private onTouched: any = (_: any) => {};
    private _required: boolean;
    public files: FileList;
    public error: string;
    public fileLoadedName: string;
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
    public disabled: boolean;

    @Input()
    public height: string = '200px';
    
    @Input()
    public width: string = '200px';

    @Input()
    public requiredError: string = 'Archivo requerido';

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

    public constructor() { }

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
        this.error = '';
        this.files = fileList;
        this.fileLoadedName = fileList.length == 1 ? fileList[0].name : `Se cargaron ${fileList.length} archivos`
        this.filesUploadedChange.emit(fileList);
        this.propagateChange(fileList);
        this.onTouched(fileList);
    }
}