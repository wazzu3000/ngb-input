import { Component } from '@angular/core';

@Component({
    selector: 'dropdown-examples',
    templateUrl: './dropdown-examples.component.html'
})
export class DropdownExamplesComponent {
    public test1: any;
    public test2: any;
    public test3: any;
    public test4: any;
    public test5: any;
    public test6: any;
    public test7: any;
    public optionsBasic = [1, 2, 3, 4, 5];
    public optionsComplex = [
        {
            value: '1',
            label: 'One'
        },
        {
            value: '2',
            label: 'Two'
        },
        {
            value: '3',
            label: 'Three'
        },
        {
            value: '4',
            label: 'Four'
        }
    ]
}