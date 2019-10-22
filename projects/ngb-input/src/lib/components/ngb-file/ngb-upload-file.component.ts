import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export enum NgbUploadFileClasses {  }

@Component({
    selector: 'ngb-upload-file',
    templateUrl: './ngb-upload-file.component.html',
    styleUrls: ['./ngb-upload-file.component.scss']
})
export class NgbUploadFileComponent implements OnInit, ControlValueAccessor {
    private propagateChange: any = (_: any) => {};
    private onTouched: any = (_: any) => {};
    private _class: string;
    private hoverClass: string;
    public files: FileList;
    public error: string;
    public isHover: boolean;

    @Output()
    public filesUploadedChange = new EventEmitter<FileList>();

    @Input()
    public id: string;

    @Input()
    public name: string;

    @Input()
    public accept: string;

    @Input()
    public required: boolean;

    @Input()
    public multiple: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public requiredError: string = 'Archivo requerido';

    @Input()
    public dirty: boolean;

    @Input('type')
    public get type(): string {
        return this.isHover ? this.hoverClass : this._class
    }

    public set type(type: string) {
        this.hoverClass = `bg-${type}`;
        if (type != 'light') {
            this.hoverClass += ' text-white'
        }
        this._class = `border border-${type}`;
    }

    public get outlineClass() {
        return `border-${this.type}`;
    }

    public get fileLoadedName(): string {
        if (!this.files || this.files.length == 0)
            return '';
        else if (this.files.length == 1)
            return this.files[0].name
        else
            return `Se cargaron ${this.files.length} archivos`;
    }

    public constructor() { }

    public ngOnInit(): void {
        this.error = this.requiredError;
    }

    public filesDropped(event: FileList) {
        if (this.disabled) {
            return;
        }

        this.files = event;
        this.filesUploadedChange.emit(event);
        this.error = '';
        this.propagateChange(event);
        this.onTouched(event);
    }

    public filesHovered(isHover: boolean) {
        if (this.disabled) {
            return;
        }
        this.isHover = isHover;
    }

    public onInputFileChange(event: Event) {
        let files: FileList = event.target['files'];
        this.error = '';
        if (files.length > 0) {
            this.filesUploadedChange.emit(files);
        }
    }

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
}