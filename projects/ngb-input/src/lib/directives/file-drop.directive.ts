import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[fileDrop]'
})
export class FileDropDirective {
    @Output()
    filesDropped = new EventEmitter<FileList>();

    @Output()
    filesHovered = new EventEmitter<boolean>();

    public constructor() { }

    @HostListener('drop', ['$event'])
    public onDrop($event: DragEvent): void {
        $event.preventDefault();
        let transfer = $event.dataTransfer;
        this.filesDropped.emit(transfer.files);
        this.filesHovered.emit(false);
    }

    @HostListener('dragover', ['$event'])
    public onDragOver($event: DragEvent): void {
        $event.preventDefault();
        this.filesHovered.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave($event: DragEvent): void {
        $event.preventDefault();
        this.filesHovered.emit(false);
    }
}