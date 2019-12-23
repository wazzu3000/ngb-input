import { Component } from '@angular/core';

@Component({
    selector: 'dropdown-examples',
    templateUrl: './dropdown-examples.component.html'
})
export class DropdownExamplesComponent {
    public test1: any
    public test2 = 1;
    public test3 = { "value": "3", "label": "Three" };
    public test4 = 4;
    public test5 = [1, 2];
    public test6 = [{ value: '2', label: 'Two' }, { "value": "1", "label": "One" }];
    public test7 = ['2', '4'];
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