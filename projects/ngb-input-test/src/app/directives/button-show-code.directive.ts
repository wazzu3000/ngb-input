import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[button-show-code]'
})
export class ButtonShowCodeDirective implements OnInit {
    public constructor(private button: ElementRef<HTMLButtonElement>) {

    }

    public ngOnInit() {
        const button = this.button.nativeElement;
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.type = 'button';
        button.innerText = 'Show code';
    }
}