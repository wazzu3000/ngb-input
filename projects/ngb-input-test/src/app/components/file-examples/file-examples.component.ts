import { Component } from '@angular/core';

@Component({
    selector: 'file-examples',
    templateUrl: './file-examples.component.html'
})
export class FileExamplesComponent {
    public tests: { [key: number]: any } = {};
    public dirty: { [key: number]: boolean } = {}
}