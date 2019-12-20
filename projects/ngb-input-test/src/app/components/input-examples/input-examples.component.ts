import { Component } from '@angular/core';

@Component({
    selector: 'input-examples',
    templateUrl: './input-examples.component.html'
})
export class InputExamplesComponent {
    public test1: string;
    public test2: string;
    public test3: string;
    public test4: string;

    // Show example codes
    showSimpleInput: boolean;
    showAddALabel: boolean;
    showRequiredInput: boolean;

    // Example codes
    public simpleInput = '<ngb-input id="test" name="test" [(ngModel)]="test1"></ngb-input>';
    public addALabel = '<ngb-input id="test" name="test" [(ngModel)]="test2" label="Write something"></ngb-input>';
    public requiredInput = '<ngb-input id="test" name="test" [(ngModel)]="test3" label="Text required" [required]="true"></ngb-input>';

    public xml = ['xml'];
}